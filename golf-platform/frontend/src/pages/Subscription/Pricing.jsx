import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { paymentService } from '../../services/paymentService';

export default function Pricing() {
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (planType) => {
    setLoading(planType);
    try {
      const response = await paymentService.createCheckoutSession(planType);
      window.location.href = response.url;
    } catch (err) {
      alert("Failed to initiate payment. Please check backend is running with Stripe config.");
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-500">Unlock your true potential on the course with Premium.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-sm hover:shadow-xl transition-shadow flex flex-col h-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Monthly</h3>
          <p className="text-slate-500 mb-6">Flexibility to play on your terms.</p>
          <div className="mb-8 flex items-baseline text-slate-900">
            <span className="text-5xl font-extrabold tracking-tight">$9.99</span>
            <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
          </div>
          <ul className="mb-8 space-y-4 flex-1">
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-3 shrink-0" /><span className="text-slate-600">Advanced Score Tracking</span></li>
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-3 shrink-0" /><span className="text-slate-600">Weekly Draw Entries</span></li>
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-3 shrink-0" /><span className="text-slate-600">Standard Support</span></li>
          </ul>
          <button 
            onClick={() => handleSubscribe('MONTHLY')}
            disabled={loading !== null}
            className="w-full bg-slate-900 text-white font-bold rounded-xl py-4 hover:bg-slate-800 transition-colors flex justify-center items-center h-14"
          >
            {loading === 'MONTHLY' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Get Monthly'}
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 w-full max-w-sm flex flex-col h-full transform md:-translate-y-4 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Yearly</h3>
          <p className="text-slate-400 mb-6">Save 16% annually and unlock VIP features.</p>
          <div className="mb-8 flex items-baseline text-white">
            <span className="text-5xl font-extrabold tracking-tight">$99.99</span>
            <span className="ml-1 text-xl font-semibold text-slate-400">/yr</span>
          </div>
          <ul className="mb-8 space-y-4 flex-1">
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-400 mr-3 shrink-0" /><span className="text-slate-300">All Monthly Features</span></li>
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-400 mr-3 shrink-0" /><span className="text-slate-300">VIP Draw Multiplier (x3)</span></li>
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-400 mr-3 shrink-0" /><span className="text-slate-300">Priority 24/7 Support</span></li>
            <li className="flex items-center"><Check className="h-5 w-5 text-emerald-400 mr-3 shrink-0" /><span className="text-slate-300">10% Charity Match</span></li>
          </ul>
          <button 
            onClick={() => handleSubscribe('YEARLY')}
            disabled={loading !== null}
            className="w-full bg-rose-500 text-white font-bold rounded-xl py-4 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 flex justify-center items-center h-14"
          >
            {loading === 'YEARLY' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Get Yearly'}
          </button>
        </div>
      </div>
    </div>
  );
}
