import { Contract, BrowserProvider } from "ethers";
import BerryManagerABI from "../abis/BerryManager.json";
// Sonic Blaze Testnet RPC URL
// const SONIC_RPC_URL = "https://rpc.blaze.soniclabs.com";

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
