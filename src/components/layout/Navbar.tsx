import { Link, useLocation } from 'react-router';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: '/termux', label: 'Termux', activeColor: 'text-accent-termux', borderColor: 'border-accent-termux/50' },
    { path: '/linux', label: 'Linux', activeColor: 'text-accent-linux', borderColor: 'border-accent-linux/50' },
    { path: '/cmd', label: 'CMD', activeColor: 'text-accent-cmd', borderColor: 'border-accent-cmd/50' },
    { path: '/contact', label: 'Contact', activeColor: 'text-text-primary', borderColor: 'border-white/20' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-background/60 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-text-primary font-bold text-lg">
            <Terminal className="w-5 h-5 text-accent-termux" />
            <span className="hidden sm:inline">CmdReference</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              // Check if we are exactly on the path, or on a sub-path (e.g., /termux/pkg-install)
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-b-2 ${
                    isActive 
                      ? `${item.activeColor} ${item.borderColor}` 
                      : 'text-text-secondary border-transparent hover:text-text-primary hover:border-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
