// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";
// import abiData from '@/public/contracts/quicknet_project_contracts_FieldFactory.contract_class.json';

// import { AccountInterface, CallData, Abi } from "starknet";
// import {
//   Alert,
//   AlertDescription,
// } from "@/components/ui/alert";
// import { FaEthereum } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";

// type TransactionState = {
//   isProcessing: boolean;
//   hash: string | null;
//   status: string;
//   error: null | string;
// };

// class StarknetTransactionHandler {
//   private account: AccountInterface;
//   private contractAddress: string;

//   constructor(account: AccountInterface, contractAddress: string) {
//     this.account = account;
//     this.contractAddress = contractAddress;
//   }

//   async invokePlaceBet(betAmount: string) {
//     try {
//       const tx = {
//         contractAddress: this.contractAddress,
//         entrypoint: "place_bet",
//         calldata: CallData.compile([betAmount]),
//       };

//       const abi: Abi[] = abiData.abi as unknown as Abi[];
//       const response = await this.account.execute([tx], abi, {
//         maxFee: BigInt(1e16),
//       });

//       return response.transaction_hash;
//     } catch (error) {
//       console.error("Error invoking place_bet:", error);
//       throw error;
//     }
//   }

//   async waitForTransaction(txHash: string) {
//     try {
//       const receipt = await this.account.waitForTransaction(txHash);
//       return receipt;
//     } catch (error) {
//       console.error("Error waiting for transaction:", error);
//       throw error;
//     }
//   }
// }

// export default function PlaceYourBetForm() {
//   const router = useRouter();
//   const [betAmount, setBetAmount] = useState("");
//   const [transactionState, setTransactionState] = useState<TransactionState>({
//     isProcessing: false,
//     hash: null,
//     status: "idle",
//     error: null,
//   });
//   const { primaryWallet } = useDynamicContext();
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const { toast } = useToast();

//   const [betDetails, setBetDetails] = useState({
//     amount: "",
//     team: "",
//     odds: "",
//     potentialReturn: 0,
//   });

//   const validateBet = (amount: string) => {
//     if (!amount) {
//       throw new Error("Please enter a bet amount.");
//     }
//     const numAmount = Number(amount);
//     if (isNaN(numAmount) || numAmount <= 0) {
//       throw new Error("Please enter a valid positive number.");
//     }
//     return numAmount;
//   };

//   const getStarknetAccount = async () => {
//     const normalizedWallet = primaryWallet as Wallet;
//     const account = (await normalizedWallet?.connector?.getSigner()) as AccountInterface;

//     if (!account) {
//       throw new Error("Please connect your wallet first.");
//     }

//     return account;
//   };

//   const handlePlaceBet = () => {
//     try {
//       const numAmount = validateBet(betAmount);
//       const potentialReturn = numAmount * 2;
//       setBetDetails({
//         amount: betAmount,
//         team: "Team Name",
//         odds: "2.0",
//         potentialReturn,
//       });
//       setShowConfirmation(true);
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.message,
//       });
//     }
//   };

//   const handleConfirmBet = async () => {
//     setShowConfirmation(false);
//     setTransactionState({ isProcessing: true, hash: null, status: "pending", error: null });

//     try {
//       const account = await getStarknetAccount();
//       const txHandler = new StarknetTransactionHandler(
//         account,
//         "0x06228e3a3a8fe69244c0799535d79b207de9d46cf452092ff1c99f9c34caee3f"
//       );

//       const txHash = await txHandler.invokePlaceBet(BigInt(betAmount).toString());
//       setTransactionState((prev) => ({ ...prev, hash: txHash }));

//       const receipt = await txHandler.waitForTransaction(txHash);

//       if (receipt.status === "ACCEPTED_ON_L2") {
//         toast({
//           title: "Bet Placed Successfully!",
//           description: "Redirecting to your portfolio...",
//         });

//         const existingBets = JSON.parse(localStorage.getItem("userBets") || "[]");
//         const newBet = {
//           id: Date.now(),
//           ...betDetails,
//           status: "active",
//           timestamp: new Date().toISOString(),
//           txHash,
//         };
//         localStorage.setItem("userBets", JSON.stringify([...existingBets, newBet]));

//         setTimeout(() => router.push("/my-bets"), 1500);
//       } else {
//         throw new Error(`Transaction failed: ${receipt.status}`);
//       }
//     } catch (error: any) {
//       setTransactionState({ ...transactionState, status: "error", error: error.message });
//       toast({
//         variant: "destructive",
//         title: "Error placing bet",
//         description: error.message,
//       });
//     } finally {
//       setTransactionState((prev) => ({ ...prev, isProcessing: false }));
//     }
//   };

//   return (
//     <div className="max-w-md w-full space-y-6">
//       {transactionState.error && (
//         <Alert variant="destructive">
//           <AlertDescription>{transactionState.error}</AlertDescription>
//         </Alert>
//       )}

//       <motion.div
//         className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="bg-gray-950 rounded-lg p-8 space-y-6">
//           <h1 className="text-2xl font-bold text-center text-purple-400">Place Your Bet</h1>
//           <div className="space-y-2">
//             <label htmlFor="betAmount" className="block text-gray-400">
//               Enter Bet Amount:
//             </label>
//             <div className="relative">
//               <input
//                 id="betAmount"
//                 type="number"
//                 value={betAmount}
//                 onChange={(e) => setBetAmount(e.target.value)}
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//                 placeholder="Enter amount"
//                 disabled={transactionState.isProcessing}
//                 min="0"
//                 step="any"
//               />
//               <FaEthereum className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <motion.button
//               onClick={handlePlaceBet}
//               disabled={transactionState.isProcessing}
//               className={`w-full py-3 rounded-lg font-bold transition-all ${
//                 transactionState.isProcessing
//                   ? "bg-gray-500 cursor-not-allowed"
//                   : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
//               }`}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {transactionState.isProcessing ? "Processing..." : "Place Bet"}
//             </motion.button>

//             <motion.button
//               onClick={() => router.push("/")}
//               disabled={transactionState.isProcessing}
//               className="w-full py-3 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Cancel
//             </motion.button>
//           </div>

//           {transactionState.hash && (
//             <div className="text-sm text-gray-400 break-all">
//               Transaction Hash: {transactionState.hash}
//             </div>
//           )}
//         </div>
//       </motion.div>

//       <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
//         <DialogContent className="bg-gray-900 border border-purple-500/20">
//           <DialogHeader>
//             <DialogTitle className="text-xl text-white">Confirm Your Bet</DialogTitle>
//             <DialogDescription className="text-gray-400">
//               Please review your bet details before confirming.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Amount:</span>
//               <span className="text-white font-bold">{betDetails.amount} ETH</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Team:</span>
//               <span className="text-white">{betDetails.team}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Odds:</span>
//               <span className="text-white">{betDetails.odds}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Potential Return:</span>
//               <span className="text-white font-bold">{betDetails.potentialReturn} ETH</span>
//             </div>
//           </div>

//           <DialogFooter>
//             <motion.button
//               onClick={handleConfirmBet}
//               className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Confirm Bet
//             </motion.button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";
import { AccountInterface, CallData, Abi } from "starknet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FaEthereum } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type TransactionState = {
  isProcessing: boolean;
  hash: string | null;
  status: string;
  error: null | string;
};

class StarknetTransactionHandler {
  private account: AccountInterface;
  private contractAddress: string;

  constructor(account: AccountInterface, contractAddress: string) {
    this.account = account;
    this.contractAddress = contractAddress;
  }

  async invokePlaceBet(betAmount: string) {
    try {
      const tx = {
        contractAddress: this.contractAddress,
        entrypoint: "place_bet",
        calldata: CallData.compile([betAmount]),
      };

      const abi: Abi[] = abiData.abi as unknown as Abi[];
      const response = await this.account.execute([tx], abi, {
        maxFee: BigInt(1e16),
      });

      return response.transaction_hash;
    } catch (error) {
      console.error("Error invoking place_bet:", error);
      throw error;
    }
  }

  async waitForTransaction(txHash: string) {
    try {
      const receipt = await this.account.waitForTransaction(txHash);
      return receipt;
    } catch (error) {
      console.error("Error waiting for transaction:", error);
      throw error;
    }
  }
}

export default function PlaceYourBetForm() {
  const router = useRouter();
  const [betAmount, setBetAmount] = useState("");
  const [transactionState, setTransactionState] = useState<TransactionState>({
    isProcessing: false,
    hash: null,
    status: "idle",
    error: null,
  });
  const { primaryWallet } = useDynamicContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const [betDetails, setBetDetails] = useState({
    amount: "",
    team: "",
    odds: "",
    potentialReturn: 0,
  });

  const validateBet = (amount: string) => {
    if (!amount) {
      throw new Error("Please enter a bet amount.");
    }
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error("Please enter a valid positive number.");
    }
    return numAmount;
  };

  const getStarknetAccount = async () => {
    const normalizedWallet = primaryWallet as Wallet;
    const account =
      (await normalizedWallet?.connector?.getSigner()) as AccountInterface;

    if (!account) {
      throw new Error("Please connect your wallet first.");
    }

    return account;
  };

  const handlePlaceBet = () => {
    try {
      const numAmount = validateBet(betAmount);
      const potentialReturn = numAmount * 2;
      setBetDetails({
        amount: betAmount,
        team: "Team Name",
        odds: "2.0",
        potentialReturn,
      });
      setShowConfirmation(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleConfirmBet = async () => {
    setShowConfirmation(false);
    setTransactionState({
      isProcessing: true,
      hash: null,
      status: "pending",
      error: null,
    });

    try {
      const account = await getStarknetAccount();
      const txHandler = new StarknetTransactionHandler(
        account,
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
      );

      const txHash = await txHandler.invokePlaceBet(
        BigInt(betAmount).toString()
      );
      setTransactionState((prev) => ({ ...prev, hash: txHash }));

      const receipt = await txHandler.waitForTransaction(txHash);

      if (receipt.status === "ACCEPTED_ON_L2") {
        toast({
          title: "Bet Placed Successfully!",
          description: "Redirecting to your portfolio...",
        });

        const existingBets = JSON.parse(
          localStorage.getItem("userBets") || "[]"
        );
        const newBet = {
          id: Date.now(),
          ...betDetails,
          status: "active",
          timestamp: new Date().toISOString(),
          txHash,
        };
        localStorage.setItem(
          "userBets",
          JSON.stringify([...existingBets, newBet])
        );

        setTimeout(() => router.push("/my-bets"), 1500);
      } else {
        throw new Error(`Transaction failed: ${receipt.status}`);
      }
    } catch (error: any) {
      setTransactionState({
        ...transactionState,
        status: "error",
        error: error.message,
      });
      toast({
        variant: "destructive",
        title: "Error placing bet",
        description: error.message,
      });
    } finally {
      setTransactionState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  return (
    <div className="max-w-md w-full space-y-6">
      {transactionState.error && (
        <Alert variant="destructive">
          <AlertDescription>{transactionState.error}</AlertDescription>
        </Alert>
      )}

      <motion.div
        className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gray-950 rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-purple-400">
            Place Your Bet
          </h1>
          <div className="space-y-2">
            <label htmlFor="betAmount" className="block text-gray-400">
              Enter Bet Amount:
            </label>
            <div className="relative">
              <input
                id="betAmount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter amount"
                disabled={transactionState.isProcessing}
                min="0"
                step="any"
              />
              <FaEthereum className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={handlePlaceBet}
              disabled={transactionState.isProcessing}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                transactionState.isProcessing
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {transactionState.isProcessing ? "Processing..." : "Place Bet"}
            </motion.button>

            <motion.button
              onClick={() => router.push("/")}
              disabled={transactionState.isProcessing}
              className="w-full py-3 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>

          {transactionState.hash && (
            <div className="text-sm text-gray-400 break-all">
              Transaction Hash: {transactionState.hash}
            </div>
          )}
        </div>
      </motion.div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gray-900 border border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Confirm Your Bet
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please review your bet details before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount:</span>
              <span className="text-white font-bold">
                {betDetails.amount} ETH
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Team:</span>
              <span className="text-white">{betDetails.team}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Odds:</span>
              <span className="text-white">{betDetails.odds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Potential Return:</span>
              <span className="text-white font-bold">
                {betDetails.potentialReturn} ETH
              </span>
            </div>
          </div>

          <DialogFooter>
            <motion.button
              onClick={handleConfirmBet}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm Bet
            </motion.button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
