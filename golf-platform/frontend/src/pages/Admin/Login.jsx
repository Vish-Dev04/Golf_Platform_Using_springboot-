import { useState } from 'react';
import { Target, Loader2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await authService.login({ username, password });
      if (response.role !== 'ROLE_ADMIN') {
         authService.logout();
         setError('Unauthorized: Admin privileges required.');
         setLoading(false);
         return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to sign in. Please check credentials.');
    } finally {
      if(loading) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12 selection:bg-rose-500/30">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="px-8 pt-10 pb-8 text-center bg-slate-800/50 border-b border-slate-700">
          <ShieldAlert className="h-14 w-14 text-rose-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
          <p className="text-slate-400 mt-2 text-sm">Authorized personnel only</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-rose-500/10 text-rose-500 p-3 rounded-lg text-sm mb-6 border border-rose-500/20 text-center font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Admin Username</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-colors placeholder:text-slate-600"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-colors placeholder:text-slate-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-rose-600 text-white font-bold rounded-xl py-3.5 hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20 mt-4 flex justify-center items-center h-12"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
