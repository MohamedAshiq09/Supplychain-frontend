import { Chain } from "wagmi";

export const SonicTestnet: Chain = {
  id: 57054,
  name: "Sonic Testnet",
  network: "sonic",
  nativeCurrency: {
    decimals: 18,
    name: "Sonic",
    symbol: "SONIC",
  },
  rpcUrls: {
    public: { http: ["https://testnet.sonicscan.org"] },
    default: { http: ["https://testnet.sonicscan.org"] },
  },
  blockExplorers: {
    default: { name: "SonicScan", url: "https://testnet.sonicscan.org" },
  },
  testnet: true,
};