import { createCache } from "async-cache-dedupe";
import { chunk, groupBy } from "lodash-es";
import { Smartgate } from "@shared/mudsql";
import { EnvVariablesService } from "./envVariables";
import { SolarSystemsService } from "./solarSystems";
import { MudSqlService } from "./mudSql";
import { MudWeb3Service } from "./mudWeb3";
import { Optimize, SmartGateLink } from "./PathFinder/types";
import { callPathFinder, CallPathFinderConfig } from "./PathFinder/callPathFinders";
export { Optimize };

interface PathFinderServiceConfig {
  env: EnvVariablesService;
  solarSystems: SolarSystemsService;
  mudSql: MudSqlService;
  mudWeb3: MudWeb3Service;
}

export function createPathFinderService({ env, solarSystems, mudSql, mudWeb3 }: PathFinderServiceConfig) {
  const config: CallPathFinderConfig = {
    lambda370Arn: env.PATHFINDER_ARN_370,
    lambda500Arn: env.PATHFINDER_ARN_500,
  };

  const cache = createCache({
    ttl: 60 * 15, // 15 minutes
    stale: 60,
    storage: { type: "memory" },
  })
    .define("getUsableSmartgates", async () => {
      const smartGates = await mudSql.listUsableSmartgates();

      const byAccess = groupBy(Object.values(smartGates), (v) =>
        v.systemId == "0x0000000000000000000000000000000000000000000000000000000000000000" ? "public" : "restricted",
      ) as Record<"restricted" | "public", Smartgate[] | undefined>;

      return { ...byAccess, all: smartGates };
    })
    .define("getSmartGateLinks", async (characterId: string): Promise<SmartGateLink[]> => {
      console.log("getSmartGateLinks", characterId);
      if (!characterId) return [];
      const smartGates = await cache.getUsableSmartgates();

      const links = await Promise.allSettled(
        (smartGates.public ?? []).map(async (smartGate) => {
          const destination = smartGates.all[smartGate.destinationId];
          if (destination) {
            const distance = await solarSystems.getDistance(smartGate.solarSystemId, destination.solarSystemId);
            return {
              from: Number(smartGate.solarSystemId),
              to: Number(destination.solarSystemId),
              distance: Math.round(distance),
            };
          }
          throw new Error(`Destination destination not found: ${smartGate.id} -> ${smartGate.destinationId}`);
        }),
      ).then(
        (results) => results.filter((r) => r.status === "fulfilled").map((p) => p.value), // Missconfigured smartgate may throw an error, ignore it
      );

      let allowedLinks: SmartGateLink[] = [];
      if (characterId !== "0") {
        const start = Date.now();
        allowedLinks = await Promise.allSettled(
          (smartGates.restricted ?? []).map(async (smartGate) => {
            const destination = smartGates.all[smartGate.destinationId];

            if (destination) {
              const canJump = await mudWeb3.gateCanJump({
                characterId,
                sourceGateId: smartGate.id,
                destinationGateId: destination.id,
              });
              if (canJump) {
                const distance = await solarSystems.getDistance(smartGate.solarSystemId, destination.solarSystemId);
                return {
                  from: Number(smartGate.solarSystemId),
                  to: Number(destination.solarSystemId),
                  distance: Math.round(distance),
                };
              }
            }
            throw new Error(`Destination destination not found: ${smartGate.id} -> ${smartGate.destinationId}`);
          }),
        ).then(
          (results) => results.filter((r) => r.status === "fulfilled").map((p) => p.value), // Missconfigured smartgate may throw an error, ignore it
        );
        console.log(`Got ${allowedLinks.length} allowed smartgate links in ${Date.now() - start}ms`);
      }

      return [...links, ...allowedLinks];
    });

  return {
    findPath: async (from: number, to: number, jumpDistance: number, optimize: Optimize, characterId: string = "0") => {
      const smartGateLinks = await cache.getSmartGateLinks(characterId);

      const distance = await solarSystems.getDistance(from, to);
      if (optimize !== Optimize.HOPS && distance > jumpDistance * 20) {
        // We need to split the problem
        const parts = Math.min(Math.ceil(distance / (jumpDistance * 20)), 4); // 4 is the maximum number of parts
        console.log(`Splitting the path into ${parts} parts`, distance);
        const largePath = await callPathFinder(from, to, 500, optimize, smartGateLinks, config);
        const chunkSize = Math.round(largePath.length / parts);
        const chunks = chunk(largePath, chunkSize);
        const nodes = [from, ...chunks.map((chunk) => chunk[chunk.length - 1].target)];

        let start: number = nodes.shift()!;
        const promises: Promise<Awaited<ReturnType<typeof callPathFinder>>>[] = [];
        while (nodes.length > 0) {
          const end = nodes.shift()!;
          promises.push(callPathFinder(start, end, jumpDistance, optimize, smartGateLinks, config));
          start = end;
        }
        const paths = await Promise.all(promises);
        return paths.flat();
      }

      return callPathFinder(from, to, jumpDistance, optimize, smartGateLinks, config);
    },
  };
}
