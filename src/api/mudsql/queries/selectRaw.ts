import { Client } from "@hey-api/client-fetch";
import { MudSqlClient } from "../client";
import { postQ } from "../generated";
import { MudSqlClientConfig } from "../types";
import { transformResult } from "../utils";

export const selectRaw =
  (_: MudSqlClient, config: MudSqlClientConfig, restClient: Client) =>
  async (sql: string): Promise<Record<string, string>[]> => {
    if (import.meta.env.DEV) {
      console.log("MUD Sql:", sql);
    }

    const r = await postQ({
      body: [{ address: config.worldAddress, query: sql }],
      client: restClient,
    });
    if (r.error) {
      throw new Error(r.error.msg);
    }
    return transformResult(r.data.result);
  };