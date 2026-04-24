import { Trophy, Target, BarChart2, CalendarDays, Key, Users } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Exclusive Draws",
      description: "Enter weekly raffles to win premium gear, apparel, and world-class tee times."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Score Tracking",
      description: "Keep a detailed history of your rounds, analyze your strokes, and track your handicap over time."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Charitable Impact",
      description: "Play with purpose. Premium subscriptions directly fund incredible partner charities."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-emerald-500" />,
      title: "Advanced Analytics",
      description: "Gain insights into your gameplay with rich data visualization and hole-by-hole breakdowns."
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-rose-500" />,
      title: "Event Scheduling",
      description: "Organize rounds with friends, manage tee times, and sync directly to your personal calendar."
    },
    {
      icon: <Key className="h-8 w-8 text-amber-500" />,
      title: "Premium Access",
      description: "Unlock VIP features, priority draw entries, and exclusive community forums."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Everything you need to <span className="text-primary italic">dominate</span> the course.</h1>
        <p className="text-lg text-slate-600">The ultimate toolkit designed for golfers who want to improve their game, win big, and give back to the community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feature, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:shadow-xl transition-all group">
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
