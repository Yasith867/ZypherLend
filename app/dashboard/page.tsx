export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-green-400 mb-10">
        ZipherLend Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-2xl mb-4 text-green-400">
            Compute Credit Score
          </h2>

          <input
            type="number"
            placeholder="Income"
            className="w-full mb-4 p-3 bg-neutral-900 border border-neutral-700 rounded"
          />

          <input
            type="number"
            placeholder="Liabilities"
            className="w-full mb-4 p-3 bg-neutral-900 border border-neutral-700 rounded"
          />

          <input
            type="number"
            placeholder="Repayment Rate (%)"
            className="w-full mb-6 p-3 bg-neutral-900 border border-neutral-700 rounded"
          />

          <button className="bg-green-500 w-full py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Compute Score
          </button>
        </div>

        <div className="border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-2xl mb-4 text-green-400">
            Request Loan
          </h2>

          <input
            type="number"
            placeholder="Loan Amount"
            className="w-full mb-6 p-3 bg-neutral-900 border border-neutral-700 rounded"
          />

          <button className="bg-green-500 w-full py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Issue Loan
          </button>
        </div>

      </div>
    </main>
  );
}
