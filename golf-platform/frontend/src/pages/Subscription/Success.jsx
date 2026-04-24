import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus('error');
        return;
      }
      
      try {
        const userId = localStorage.getItem('userId');
        await api.post('/payment/success', {
          sessionId,
          userId
        });
        setStatus('success');
      } catch (error) {
        console.error('Payment verification failed:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
        <Loader2 className="h-24 w-24 text-primary animate-spin mb-8" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Verifying Payment...</h1>
        <p className="text-xl text-slate-600">Please wait while we activate your subscription.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
        <AlertCircle className="h-24 w-24 text-rose-500 mb-8" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Verification Failed</h1>
        <p className="text-xl text-slate-600 mb-10">We could not verify your payment. Please contact support.</p>
        <Link to="/pricing" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
          Return to Pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
      <CheckCircle2 className="h-24 w-24 text-emerald-500 mb-8" />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Payment Successful!</h1>
      <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
        Your premium subscription is now active! Thank you for joining the ultimate golf community. We've remotely matched a percentage of your initial fee directly to a charity.
      </p>
      
      {sessionId && (
         <p className="text-xs font-mono text-slate-500 bg-slate-100 p-3 rounded-lg mb-8 max-w-xl w-full truncate border border-slate-200">
            Order Reference: {sessionId}
         </p>
      )}

      <Link to="/dashboard" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
        Enter Dashboard
      </Link>
    </div>
  );
}
