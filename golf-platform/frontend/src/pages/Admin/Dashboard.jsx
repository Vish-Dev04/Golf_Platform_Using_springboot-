import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import api from '../../services/api';
import { Loader2, Play, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // users, verification

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await adminService.getAllUsers();
      setUsers(userData);
      const proofData = await api.get('/proofs/admin/pending');
      setProofs(proofData.data);
    } catch (err) {
      setError('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerDraw = async () => {
    if (!window.confirm("Are you sure you want to trigger the monthly draw now?")) return;
    setActionLoading(true);
    try {
        const res = await api.post('/admin/trigger-draw');
        alert(`Draw completed! Winners (Match 5): ${res.data.match5Winners}`);
    } catch (err) {
        alert("Failed to execute draw.");
    } finally {
        setActionLoading(false);
    }
  };

  const handleProofAction = async (id, status) => {
    try {
      await api.post(`/proofs/admin/${id}/status`, { status });
      setProofs(proofs.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to update proof status");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-rose-500" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
        <button 
            onClick={handleTriggerDraw} 
            disabled={actionLoading}
            className="bg-primary text-white px-6 py-2 rounded-xl font-semibold flex items-center shadow shadow-primary/20 hover:bg-emerald-600 disabled:opacity-50"
        >
            {actionLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            Execute Draw
        </button>
      </div>

      {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6">{error}</div>}
      
      <div className="flex space-x-4 mb-6 border-b border-slate-200">
        <button 
          className={`pb-3 font-semibold text-sm ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`pb-3 font-semibold text-sm flex items-center ${activeTab === 'verification' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('verification')}
        >
          Verification {proofs.length > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{proofs.length}</span>}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'users' ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Username</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-slate-500">{u.id}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{u.username}</td>
                  <td className="px-6 py-4 text-slate-500">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ROLE_ADMIN' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="4" className="text-center py-8 text-slate-500">No users found</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="p-6">
            {proofs.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No pending verifications.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {proofs.map(p => (
                  <div key={p.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col">
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-bold text-slate-900">{p.user.username}</p>
                            <p className="text-xs text-slate-500">Draw ID: {p.draw.id}</p>
                        </div>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full h-fit">Pending</span>
                    </div>
                    {p.proofImageBase64 ? (
                        <img src={p.proofImageBase64} alt="Proof" className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-200" />
                    ) : (
                        <div className="w-full h-48 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">No Image</div>
                    )}
                    <div className="flex gap-2 mt-auto">
                        <button onClick={() => handleProofAction(p.id, 'APPROVED')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold flex justify-center items-center">
                            <Check className="h-4 w-4 mr-1" /> Approve
                        </button>
                        <button onClick={() => handleProofAction(p.id, 'REJECTED')} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg text-sm font-bold flex justify-center items-center">
                            <X className="h-4 w-4 mr-1" /> Reject
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
