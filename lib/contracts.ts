// import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";
// import type { BaseContract } from "ethers";

// // Import ABIs with TypeScript types
// import BerryTempAgentABI from "../abis/BerryTempAgent.json";
// import BerryManagerABI from "../abis/BerryManager.json";

// // Define contract interfaces
// interface BerryTempAgent extends BaseContract {
//   recordTemperature: (batchId: number, temperature: number, location: string) => Promise<any>;
// }

// interface BerryManager extends BaseContract {
//   createBatch: (berryType: string) => Promise<any>;
//   getBatchDetails: (batchId: number) => Promise<any>;
// }

// // Initialize provider (Sonic testnet)
// const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_SONIC_RPC_URL);

// // Initialize contracts with type assertions
// export const berryTempAgentContract = new Contract(
//   process.env.NEXT_PUBLIC_BERRY_TEMP_AGENT_ADDRESS!,
//   BerryTempAgentABI,
//   provider
// ) as unknown as BerryTempAgent;

// export const berryManagerContract = new Contract(
//   process.env.NEXT_PUBLIC_BERRY_MANAGER_ADDRESS!,
//   BerryManagerABI,
//   provider
// ) as unknown as BerryManager;

// // Function to get batch details
// export const getBatchDetails = async (batchId: number) => {
//   return await berryManagerContract.getBatchDetails(batchId);
// };

// // Function to create a new batch
// export const createBatch = async (berryType: string) => {
//   const browserProvider = new BrowserProvider(window.ethereum);
//   const signer = await browserProvider.getSigner();
//   const contractWithSigner = berryManagerContract.connect(signer) as BerryManager;
//   return await contractWithSigner.createBatch(berryType);
// };

// // Function to record temperature
// export const recordTemperature = async (batchId: number, temperature: number, location: string) => {
//   const browserProvider = new BrowserProvider(window.ethereum);
//   const signer = await browserProvider.getSigner();
//   const contractWithSigner = berryTempAgentContract.connect(signer) as BerryTempAgent;
//   return await contractWithSigner.recordTemperature(batchId, temperature, location);
// };

import { Contract, BrowserProvider } from "ethers";
import BerryManagerABI from "../abis/BerryManager.json";

// Sonic Blaze Testnet RPC URL
const SONIC_RPC_URL = "https://rpc.blaze.soniclabs.com";

// Initialize provider for Sonic Blaze Testnet
const getProvider = () => {
  return new BrowserProvider(window.ethereum, {
    chainId: 57054, // Sonic Blaze Testnet chain ID
    name: "Sonic Blaze Testnet",
  });
};

// Initialize contracts
const getBerryManagerContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new Contract(
    process.env.NEXT_PUBLIC_BERRY_MANAGER_ADDRESS!,
    BerryManagerABI,
    signer
  );
};

// Function to register a supplier
export const registerSupplier = async () => {
  const contract = await getBerryManagerContract();
  const tx = await contract.registerSupplier();
  await tx.wait();
  return tx;
};