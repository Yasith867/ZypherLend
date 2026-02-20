"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface LeoWallet {
  connect: () => Promise<void>;
  getAccount: () => Promise<{ address: string }>;
  account?: { address: string };
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

  useEffect(() => {
    setIsMounted(true);
    const checkConnection = async () => {
      try {
        if (window.leoWallet?.getAccount) {
          const account = await window.leoWallet.getAccount();
          if (account?.address) setWalletAddress(account.address);
        }
      } catch (err) {}
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined") return;
    try {
      setConnecting(true);
      const wallet = window.leoWallet;
      if (!wallet) {
        alert("Leo Wallet not detected ❌\n\nNote: Wallet extensions may be blocked in the Replit preview iframe. Try opening in a new tab.");
        return;
      }
      if (typeof wallet.connect === "function") await wallet.connect();
      let address: string | undefined;
      if (typeof wallet.getAccount === "function") {
        const account = await wallet.getAccount();
        address = account?.address;
      } else if (wallet.account?.address) {
        address = wallet.account.address;
      }
      if (address) setWalletAddress(address);
    } catch (error) {
      console.error(error);
      alert("Connection failed ❌");
    } finally {
      setConnecting(false);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <span className="text-black font-black text-xl">Z</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ZipherLend</span>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-sm font-medium transition-all"
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-8 tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Privacy-First Finance
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]">
          The Future of <span className="text-green-500 italic">Credit</span> <br /> 
          on Aleo.
        </h1>

        <p className="text-gray-400 max-w-xl mb-12 text-lg leading-relaxed">
          Secure, private, and trustless credit scoring powered by Zero-Knowledge proofs. 
          Borrow and lend without compromising your financial identity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="group relative bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-2xl font-bold transition-all overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
          >
            <span className="relative z-10">
              {walletAddress ? "Wallet Linked" : connecting ? "Linking..." : "Connect Leo Wallet"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center"
          >
            Launch Terminal
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/5 pt-12">
          {[
            { label: "Privacy", value: "100%", sub: "Zero-Knowledge" },
            { label: "Security", value: "Aleo", sub: "L1 Network" },
            { label: "Speed", value: "Instant", sub: "Proof Generation" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-green-500 font-bold text-3xl mb-1">{stat.value}</div>
              <div className="text-white text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <p className="text-gray-500 text-xs font-medium tracking-widest uppercase">
          © 2026 ZipherLend Protocol. Built on Aleo Blockchain.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}
