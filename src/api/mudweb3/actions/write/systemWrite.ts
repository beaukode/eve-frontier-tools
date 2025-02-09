import { BaseError, Hex, TransactionReceipt } from "viem";
import { isError } from "lodash-es";
import { WorldWriteClient } from "../../types";
import { worldAbi } from "../../abi";
import { Web3TransactionError } from "../../Web3TransactionError";

export type SytemWriteParameters = {
  systemAddress: Hex;
  data: Hex;
};

export type SystemWriteReturnType = TransactionReceipt;

export async function systemWrite(
  client: WorldWriteClient,
  args: SytemWriteParameters
): Promise<SystemWriteReturnType> {
  try {
    await client.systemSimulate({
      systemAddress: args.systemAddress,
      data: args.data,
    });

    const tx = await client.writeClient.writeContract({
      chain: client.writeClient.chain,
      account: client.writeClient.account,
      address: client.mudAddresses.world,
      abi: worldAbi,
      functionName: "call",
      args: [args.systemAddress, args.data],
    });
    const receipt = await client.waitForTransactionReceipt({
      hash: tx,
      timeout: 60 * 1000,
    });

    if (receipt.status === "reverted") {
      // In case of revert, we simulate the transaction on the same block to get the revert reason
      await client.systemSimulate({
        systemAddress: args.systemAddress,
        data: args.data,
        blockNumber: receipt.blockNumber,
      });
    }
    return receipt;
  } catch (e) {
    console.error(e);
    if (isError(e)) {
      if (e instanceof Web3TransactionError) {
        throw e;
      }
      if (e instanceof BaseError) {
        throw new Web3TransactionError(
          e.shortMessage,
          undefined,
          e.metaMessages
        );
      }
      throw new Web3TransactionError(e.message);
    } else if (typeof e === "string") {
      throw new Web3TransactionError(e);
    } else {
      throw new Web3TransactionError("Unknown error");
    }
  }
}
