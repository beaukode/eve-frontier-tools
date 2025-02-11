import { Table } from "@latticexyz/store/internal";
import {
  AssemblyGetLocationParameters,
  AssemblyGetLocationReturnType,
  assemblyGetLocation,
} from "./read/assemblyGetLocation";
import {
  AssemblyGetMetadataParameters,
  AssemblyGetMetadataReturnType,
  assemblyGetMetadata,
} from "./read/assemblyGetMetadata";
import {
  AssemblyGetStateParameters,
  AssemblyGetStateReturnType,
  assemblyGetState,
} from "./read/assemblyGetState";
import {
  GetSmartCharacterIdParameters,
  GetSmartCharacterIdReturnType,
  characterGetId,
} from "./read/characterGetId";
import {
  GateCanJumpParameters,
  GateCanJumpReturnType,
  gateCanJump,
} from "./read/gateCanJump";
import {
  GateGetSystemParameters,
  GateGetSystemReturnType,
  gateGetSystem,
} from "./read/gateGetSystem";
import {
  StoreGetRecordParameters,
  StoreGetRecordReturnType,
  storeGetRecord,
} from "./read/storeGetRecord";
import {
  SystemSimulateParameters,
  SystemSimulateReturnType,
  systemSimulate,
} from "./read/systemSimulate";
import {
  TurretGetSystemParameters,
  TurretGetSystemReturnType,
  turretGetSystem,
} from "./read/turretGetSystem";
import {
  WorldSimulateParameters,
  WorldSimulateReturnType,
  worldSimulate,
} from "./read/worldSimulate";
import { MudWeb3ClientBase } from "../types";
import { WorldAbi } from "../abi";
import { Abi } from "viem";

export type MudWeb3ReadActions = {
  assemblyGetLocation: (
    args: AssemblyGetLocationParameters
  ) => Promise<AssemblyGetLocationReturnType>;
  assemblyGetMetadata: (
    args: AssemblyGetMetadataParameters
  ) => Promise<AssemblyGetMetadataReturnType>;
  assemblyGetState: (
    args: AssemblyGetStateParameters
  ) => Promise<AssemblyGetStateReturnType>;
  characterGetId: (
    args: GetSmartCharacterIdParameters
  ) => Promise<GetSmartCharacterIdReturnType>;
  gateCanJump: (args: GateCanJumpParameters) => Promise<GateCanJumpReturnType>;
  gateGetSystem: (
    args: GateGetSystemParameters
  ) => Promise<GateGetSystemReturnType>;
  storeGetRecord: <table extends Table>(
    args: StoreGetRecordParameters<table>
  ) => Promise<StoreGetRecordReturnType<table>>;
  systemSimulate: (
    args: SystemSimulateParameters
  ) => Promise<SystemSimulateReturnType>;
  turretGetSystem: (
    args: TurretGetSystemParameters
  ) => Promise<TurretGetSystemReturnType>;
  worldSimulate: <abi extends Abi = WorldAbi>(
    args: WorldSimulateParameters<abi>
  ) => Promise<WorldSimulateReturnType>;
};

export function mudWeb3ReadActions(
  client: MudWeb3ClientBase
): MudWeb3ReadActions {
  return {
    assemblyGetLocation: async (
      args: AssemblyGetLocationParameters
    ): Promise<AssemblyGetLocationReturnType> => {
      return assemblyGetLocation(client, args);
    },
    assemblyGetMetadata: async (
      args: AssemblyGetMetadataParameters
    ): Promise<AssemblyGetMetadataReturnType> => {
      return assemblyGetMetadata(client, args);
    },
    assemblyGetState: async (
      args: AssemblyGetStateParameters
    ): Promise<AssemblyGetStateReturnType> => {
      return assemblyGetState(client, args);
    },
    gateCanJump: async (
      args: GateCanJumpParameters
    ): Promise<GateCanJumpReturnType> => {
      return gateCanJump(client, args);
    },
    characterGetId: async (
      args: GetSmartCharacterIdParameters
    ): Promise<GetSmartCharacterIdReturnType> => {
      return characterGetId(client, args);
    },
    gateGetSystem: async (
      args: GateGetSystemParameters
    ): Promise<GateGetSystemReturnType> => {
      return gateGetSystem(client, args);
    },
    storeGetRecord: async <table extends Table>(
      args: StoreGetRecordParameters<table>
    ): Promise<StoreGetRecordReturnType<table>> => {
      return storeGetRecord(client, args);
    },
    systemSimulate: async (
      args: SystemSimulateParameters
    ): Promise<SystemSimulateReturnType> => {
      return systemSimulate(client, args);
    },
    turretGetSystem: async (
      args: TurretGetSystemParameters
    ): Promise<TurretGetSystemReturnType> => {
      return turretGetSystem(client, args);
    },
    worldSimulate: async <abi extends Abi = WorldAbi>(
      args: WorldSimulateParameters<abi>
    ): Promise<WorldSimulateReturnType> => {
      return worldSimulate(client, args);
    },
  };
}
