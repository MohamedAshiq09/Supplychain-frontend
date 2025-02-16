"use client";

import {
  useConnect,
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { useState, useEffect } from "react";
import { ChevronDown, Wallet, ExternalLink, Copy, Power } from "lucide-react";

const CHAIN_NAMES: { [key: number]: string } = {
  146: "Sonic Network",
  // Add other chains as needed
};

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  const [isOpen, setIsOpen] = useState(false);

  // Handle SSR hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    connect({
      connector: injected({ target: "metaMask" }),
    });
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const openExplorer = () => {
    if (address) {
      window.open(`https://sonicscan.org/address/${address}`, "_blank");
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        <Wallet className="w-5 h-5" />
        <span className="font-semibold">Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="font-medium">
            {address ? formatAddress(address) : ""}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
          <div className="p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Connected with MetaMask
              </span>
              <button
                onClick={() => disconnect()}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
              >
                <Power className="w-4 h-4" />
                Disconnect
              </button>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {address ? formatAddress(address) : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {balance?.formatted
                      ? `${balance.formatted.slice(0, 7)} ${balance.symbol}`
                      : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg flex-1"
              >
                <Copy className="w-4 h-4" />
                Copy Address
              </button>
              <button
                onClick={openExplorer}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg flex-1"
              >
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </button>
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Network</span>
                <span className="font-medium">
                  {CHAIN_NAMES[chainId] || `Chain ${chainId}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
