"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Type definitions for Leo Wallet window injection.
 * Aleo/Leo Wallet typically injects itself as `window.leoWallet`.
 */
interface LeoWallet {
  connect: () => Promise<void>;
  getAccount: () => Promise<{ address: string }>;
  account?: { address: string };
  // Add other methods if needed based on specific SDK versions
}

declare global {
  interface Window {
    leoWallet?: LeoWallet;
  }
}

export default function Home() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering client-specific logic after mount
  useEffect(() => {
    setIsMounted(true);
    
    // Check if already connected (if the wallet supports persistence)
    const checkConnection = async () => {
      try {
        if (window.leoWallet?.getAccount) {
          const account = await window.leoWallet.getAccount();
          if (account?.address) {
            setWalletAddress(account.address);
          }
        }
      } catch (err) {
        // Silent fail on check
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined") return;

    try {
      setConnecting(true);

      const wallet = window.leoWallet;

      if (!wallet) {
        alert("Leo Wallet not detected ❌\n\nNote: Wallet extensions may not be detectable inside iframes (like Replit's preview) due to security restrictions. Please try opening the app in a new tab or installing the Leo Wallet extension.");
        setConnecting(false);
        return;
      }

      // 1. Trigger connection
      if (typeof wallet.connect === "function") {
        await wallet.connect();
      }

      // 2. Retrieve account
      let address: string | undefined;

      if (typeof wallet.getAccount === "function") {
        const account = await wallet.getAccount();
        address = account?.address;
      } else if (wallet.account?.address) {
        address = wallet.account.address;
      }

      if (address) {
        setWalletAddress(address);
      } else {
        throw new Error("Connected but could not retrieve address");
      }

    } catch (error) {
      console.error("Connection error:", error);
      alert("Wallet connection failed ❌");
    } finally {
      setConnecting(false);
    }
  };

  // Safe fallback UI during hydration
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-green-400 font-mono">Loading ZipherLend...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl font-bold text-green-400 mb-6 tracking-tighter">
          ZipherLend
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Privacy-first credit scoring and lending on Aleo. 
          Securely manage your financial identity with zero-knowledge proofs.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : connecting
              ? "Connecting..."
              : "Connect Leo Wallet"}
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="border border-green-500 text-green-500 px-8 py-3 rounded-lg hover:bg-green-500 hover:text-black font-bold transition-all"
          >
            Launch App
          </button>
        </div>
        
        {!window.leoWallet && (
          <p className="mt-8 text-xs text-gray-500 max-w-md">
            Tip: If you have Leo Wallet installed but don't see it, 
            the Replit preview iframe might be blocking the extension. 
            Try opening the site in a direct window.
          </p>
        )}
      </section>

      <footer className="fixed bottom-0 w-full py-8 text-center text-gray-600 text-xs border-t border-neutral-900 bg-black/50 backdrop-blur-sm">
        © {new Date().getFullYear()} ZipherLend. Powered by Aleo Zero-Knowledge Technology.
      </footer>
    </main>
  );
}
