export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-2">Welcome back! Here's your recent activity.</p>
        </div>
        <button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Add Score
        </button>
      </div>
      
      {/* Mock Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-slate-500 text-sm font-semibold mb-1">Average Score</p>
          <p className="text-3xl font-extrabold text-slate-900">84.2</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-slate-500 text-sm font-semibold mb-1">Raffles Entered</p>
          <p className="text-3xl font-extrabold text-slate-900">3</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <p className="text-slate-500 text-sm font-semibold mb-1">Charity Raised</p>
          <p className="text-3xl font-extrabold text-primary">$150.00</p>
        </div>
      </div>
    </div>
  );
}
