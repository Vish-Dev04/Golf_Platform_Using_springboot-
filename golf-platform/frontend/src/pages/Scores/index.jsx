import { Flag, Plus } from 'lucide-react';

export default function Scores() {
  const mockScores = [
    { id: 1, course: 'Pebble Beach Golf Links', strokes: 82, date: '2026-04-12' },
    { id: 2, course: 'Augusta National', strokes: 88, date: '2026-04-05' },
    { id: 3, course: 'St Andrews (Old)', strokes: 79, date: '2026-03-22' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Flag className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Scores</h1>
            <p className="text-slate-500">Track your performance across all courses.</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-slate-900 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Log Score</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold border-b border-border">Date</th>
              <th className="py-4 px-6 font-semibold border-b border-border">Course</th>
              <th className="py-4 px-6 font-semibold border-b border-border text-center">Strokes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockScores.map((score) => (
              <tr key={score.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-600 font-medium">{score.date}</td>
                <td className="py-4 px-6 text-slate-900 font-semibold">{score.course}</td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-lg">
                    {score.strokes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
