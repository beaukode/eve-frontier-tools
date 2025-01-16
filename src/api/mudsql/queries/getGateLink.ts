import { MudSqlClient } from "../client";
import { getAssembly } from "./getAssembly";

type DbRow = {
  sourceGateId: string;
  destinationGateId: string;
  isLinked: boolean;
};

type TargetGate = Awaited<ReturnType<ReturnType<typeof getAssembly>>> & {
  isLinked: boolean;
};

export const getGateLink =
  (client: MudSqlClient) =>
  async (id: string): Promise<TargetGate | undefined> => {
    const links = await client.selectFrom<DbRow>(
      "eveworld",
      "SmartGateLinkTab",
      {
        where: `"sourceGateId" = '${id}'`,
      }
    );
    const link = links[0];
    if (!link) return undefined;

    const assembly = await client.getAssembly(link.destinationGateId);
    if (!assembly) return undefined;

    return {
      ...assembly,
      isLinked: link.isLinked,
    };
  };
