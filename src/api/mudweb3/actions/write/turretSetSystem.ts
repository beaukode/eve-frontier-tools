import { encodeFunctionData, Hex, TransactionReceipt } from "viem";
import { WorldWriteClient } from "../../types";
import { eveworld } from "../../eveworld";
import { systemWrite } from "./systemWrite";
import { worldAbi } from "../../abi";

export type TurretSetSystemParameters = {
  turretId: bigint;
  systemId: Hex;
};

export type TurretSetSystemReturnType = TransactionReceipt;

export async function turretSetSystem(
  client: WorldWriteClient,
  args: TurretSetSystemParameters
): Promise<TurretSetSystemReturnType> {
  const data = encodeFunctionData({
    abi: worldAbi,
    functionName: "configureSmartTurret",
    args: [args.turretId, args.systemId],
  });
  return systemWrite(client, {
    systemAddress:
      eveworld.namespaces.eveworld.systems.SmartTurretSystem.systemId,
    data,
  });
}
