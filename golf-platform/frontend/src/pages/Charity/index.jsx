import { Heart } from 'lucide-react';

export default function Charity() {
  const charities = [
    { id: 1, name: 'First Tee', description: 'Impacting the lives of young people by providing educational programs that build character through golf.', target: 10000, raised: 7500 },
    { id: 2, name: 'Golfers Against Cancer', description: 'Raising money for cancer research through charity golf tournaments globally.', target: 20000, raised: 4200 },
    { id: 3, name: 'PGA HOPE', description: 'Introducing golf to Veterans with disabilities to enhance their physical and mental well-being.', target: 15000, raised: 14500 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Charity Partners</h1>
        <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">Every premium subscription directly contributes to these amazing causes. Play a round, change a life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {charities.map((c) => {
          const progress = Math.min((c.raised / c.target) * 100, 100);
          return (
            <div key={c.id} className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:shadow-xl transition-shadow flex flex-col h-full">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{c.name}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{c.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-primary">${c.raised.toLocaleString()} Raised</span>
                  <span className="text-slate-400">Target: ${c.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
