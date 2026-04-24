import { Link } from 'react-router-dom';
import { Target, UserCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-primary shadow-sm" />
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-slate-900">
              GolfPlatform
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Home</Link>
            <Link to="/features" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Features</Link>
            <Link to="/charity" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Charity</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="flex items-center space-x-2 bg-gradient-to-tr from-primary to-emerald-500 text-white px-5 py-2.5 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 font-semibold text-sm">
              <UserCheck className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
