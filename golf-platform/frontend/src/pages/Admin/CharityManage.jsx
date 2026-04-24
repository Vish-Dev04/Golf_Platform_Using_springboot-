import { useState, useEffect } from 'react';
import { charityService } from '../../services/charityService';
import { Loader2, Trash2, Plus } from 'lucide-react';

export default function CharityManage() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    try {
      const data = await charityService.getAllCharities();
      setCharities(data);
    } catch (err) {
      setError('Failed to fetch charities.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await charityService.addCharity({
         name, 
         description, 
         targetAmount: parseFloat(targetAmount),
         raisedAmount: 0 // initialize at 0
      });
      setName('');
      setDescription('');
      setTargetAmount('');
      loadCharities();
    } catch (err) {
      setError('Failed to create charity.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charity?")) return;
    try {
      await charityService.deleteCharity(id);
      loadCharities();
    } catch (err) {
      setError('Failed to delete charity.');
    }
  }

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-rose-500" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Col: Existing Charities */}
      <div>
         <h2 className="text-xl font-bold text-slate-800 mb-6">Active Charities</h2>
         {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6">{error}</div>}
         
         <div className="space-y-4">
           {charities.map(c => (
              <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-start group hover:border-rose-200 transition-colors">
                 <div>
                    <h3 className="font-bold text-slate-800 text-lg">{c.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-3">{c.description}</p>
                    <div className="flex space-x-4 text-sm font-medium">
                       <span className="text-emerald-600">Raised: ${c.raisedAmount || 0}</span>
                       <span className="text-slate-400">Target: ${c.targetAmount}</span>
                    </div>
                 </div>
                 <button onClick={() => handleDelete(c.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-2 bg-slate-50 rounded-xl group-hover:bg-rose-50">
                    <Trash2 className="h-5 w-5" />
                 </button>
              </div>
           ))}
           {charities.length === 0 && (
             <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500">No charities configured. Add one to get started!</div>
           )}
         </div>
      </div>

      {/* Right Col: Add Form */}
      <div>
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center"><Plus className="mr-2 text-rose-500"/> Add New Charity</h2>
            <form onSubmit={handleCreate} className="space-y-4">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Charity Name</label>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500" placeholder="e.g. Golfers Against Cancer" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500 min-h-[100px]" placeholder="Mission statement..." />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Target Amount ($)</label>
                  <input type="number" value={targetAmount} onChange={(e)=>setTargetAmount(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500" placeholder="10000" />
               </div>
               <button type="submit" disabled={creating} className="w-full bg-rose-500 text-white font-bold rounded-xl py-3.5 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 mt-4 flex justify-center items-center">
                  {creating ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Charity Target'}
               </button>
            </form>
         </div>
      </div>
    </div>
  );
}
