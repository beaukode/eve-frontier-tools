import { client } from "..";
import { ensureArray, toSqlHex } from "../utils";
import { Hex } from "viem";

type DbRow = {
  characterAddress: Hex;
  characterId: string;
  entity__entityId: string;
  entity__name: string;
  entity__dappURL: string;
  entity__description: string;
};

type Character = {
  address: Hex;
  id: string;
  name: string;
};

type ListCharactersOptions = {
  addresses?: string[] | string;
  orderBy?: "name" | "owner";
};

export async function listCharacters(
  options?: ListCharactersOptions
): Promise<Character[]> {
  let where: string | undefined = undefined;
  if (options?.addresses) {
    const addresses = ensureArray(options.addresses);
    if (addresses.length === 0) return []; // No addresses to query
    where = `"characterAddress" IN ('${ensureArray(addresses).map(toSqlHex).join("', '")}')`;
  }

  return client
    .selectFrom<DbRow>("eveworld", "CharactersByAddr", {
      where,
      rels: {
        entity: {
          ns: "eveworld",
          table: "EntityRecordOffc",
          field: "entityId",
          fkNs: "eveworld",
          fkTable: "CharactersByAddr",
          fkField: "characterId",
        },
      },
    })
    .then((result) =>
      result.map((r) => ({
        address: r.characterAddress,
        id: r.characterId,
        name: r.entity__name,
      }))
    );
}
