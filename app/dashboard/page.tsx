"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xl">Z</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ZipherLend</span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Mainnet Alpha</span>
        </div>
      </nav>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Terminal Dashboard</h1>
          <p className="text-gray-400 font-medium">Manage your private credit profile and loan requests.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Credit Score Module */}
          <div className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-green-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.05)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-green-500">Compute Score</h2>
              <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Monthly Income (USDT)</label>
                <input type="number" placeholder="e.g. 5000" className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl focus:border-green-500/50 focus:outline-none transition-all placeholder:text-gray-700 font-mono" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Current Liabilities</label>
                <input type="number" placeholder="e.g. 1200" className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl focus:border-green-500/50 focus:outline-none transition-all placeholder:text-gray-700 font-mono" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Repayment Rate (%)</label>
                <input type="number" placeholder="e.g. 98" className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl focus:border-green-500/50 focus:outline-none transition-all placeholder:text-gray-700 font-mono" />
              </div>
              <button className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-2xl font-bold transition-all mt-4 shadow-[0_0_20px_rgba(34,197,94,0.2)] active:scale-[0.98]">
                Generate ZK Proof & Score
              </button>
            </div>
          </div>

          {/* Loan Request Module */}
          <div className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.05)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-blue-400">Request Loan</h2>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" /></svg>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Loan Amount (USDT)</label>
                <input type="number" placeholder="e.g. 10000" className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-700 font-mono" />
              </div>
              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Estimated Interest</span>
                  <span className="text-sm font-bold text-blue-400">4.2% APY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Repayment Term</span>
                  <span className="text-sm font-bold">12 Months</span>
                </div>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-400 text-white py-4 rounded-2xl font-bold transition-all mt-4 shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-[0.98]">
                Initialize Loan Request
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Loans", val: "$0.00" },
            { label: "Credit Health", val: "Optimal" },
            { label: "Trust Score", val: "N/A" },
            { label: "Aleo Credits", val: "0.00" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-xl font-bold">{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 py-8 text-center border-t border-white/5 bg-black/50 backdrop-blur-xl mt-12">
        <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">
          ZipherLend Protocol — Aleo Layer 1 Mainnet
        </p>
      </footer>
    </main>
  );
}
