import { Chain } from "viem/chains";

export const sonicBlazeTestnet: Chain = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.blaze.soniclabs.com"],
    },
    public: {
      http: ["https://rpc.blaze.soniclabs.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sonic Blaze Explorer",
      url: "https://blaze.soniclabs.com",
    },
  },
  testnet: true,
};