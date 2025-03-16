// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type OptionsLegacyParser,
} from "@hey-api/client-fetch";
import type {
  GetApiCalcPathFromToJumpDistanceData,
  GetApiCalcPathFromToJumpDistanceError,
  GetApiCalcPathFromToJumpDistanceResponse,
} from "./types.gen";

export const client = createClient(createConfig());

export const getApiCalcPathFromToJumpDistance = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<
    GetApiCalcPathFromToJumpDistanceData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).get<
    GetApiCalcPathFromToJumpDistanceResponse,
    GetApiCalcPathFromToJumpDistanceError,
    ThrowOnError
  >({
    ...options,
    url: "/api/calc/path/{from}/{to}/{jumpDistance}",
  });
};
