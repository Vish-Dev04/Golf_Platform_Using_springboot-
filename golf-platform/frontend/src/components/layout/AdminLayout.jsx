import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Users, Heart, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  }

  const getPageTitle = () => {
    if (location.pathname.includes('charities')) return "Charity Manager";
    return "User Database";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Shield className="h-6 w-6 text-rose-500 mr-3" />
          <span className="text-xl font-bold text-white tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin/dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors ${location.pathname.includes('dashboard') ? 'bg-slate-800 text-white' : ''}`}>
            <Users className="h-5 w-5" />
            <span className="font-medium">User Data</span>
          </Link>
          <Link to="/admin/charities" className={`flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors ${location.pathname.includes('charities') ? 'bg-slate-800 text-white' : ''}`}>
            <Heart className="h-5 w-5" />
            <span className="font-medium">Manage Charities</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl hover:bg-rose-500 hover:text-white transition-colors text-left">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">{getPageTitle()}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
