"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setConnecting(true);

      const wallet = (window as any).leoWallet;

      if (!wallet) {
        alert("Leo Wallet not detected ❌");
        setConnecting(false);
        return;
      }

      let account;

      // Try modern API
      if (wallet.connect) {
        await wallet.connect();
      }

      // Try account getter
      if (wallet.getAccount) {
        account = await wallet.getAccount();
      }

      // Try alternative API
      if (!account && wallet.account) {
        account = wallet.account;
      }

      if (account?.address) {
        setWalletAddress(account.address);
      } else {
        alert("Could not retrieve wallet address");
      }

      setConnecting(false);
    } catch (error) {
      console.error(error);
      alert("Wallet connection failed ❌");
      setConnecting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl font-bold text-green-400 mb-6">
          ZipherLend
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Privacy-first credit scoring and lending on Aleo.
        </p>

        <div className="flex gap-6">
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {walletAddress
              ? `Connected: ${walletAddress.slice(0, 8)}...`
              : connecting
              ? "Connecting..."
              : "Connect Wallet"}
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="border border-green-500 px-8 py-3 rounded-lg hover:bg-green-500 hover:text-black transition"
          >
            Launch App
          </button>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm border-t border-neutral-900">
        © {new Date().getFullYear()} ZipherLend. Built on Aleo.
      </footer>

    </main>
  );
}
