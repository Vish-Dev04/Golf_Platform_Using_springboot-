import heroImage from '../../assets/hero-banner.png';
import { ArrowRight, Trophy, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] sm:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Golf Hero" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
            Elevate Your <span className="text-primary italic">Game.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            Join the premium golf community. Track scores, win exclusive draws, and support amazing charities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-2 hover:scale-105 hover:bg-emerald-600 transition-all shadow-xl shadow-primary/20">
              <span>Join Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/charity" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              View Charities
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-border/50 hover:shadow-lg transition-all group">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Win Premium Gear</h3>
              <p className="text-slate-600 text-lg">Enter our exclusive weekly draws to win top-tier clubs, apparel, and tee times at world-class courses.</p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-border/50 hover:shadow-lg transition-all group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Play with Purpose</h3>
              <p className="text-slate-600 text-lg">A portion of every subscription goes directly to our partnered charities. Give back while playing the game you love.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
