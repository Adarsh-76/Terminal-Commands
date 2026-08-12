import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Home, Terminal, Code2, SquareTerminal } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home, activeColor: 'text-text-primary' },
    { path: '/termux', label: 'Termux', icon: Terminal, activeColor: 'text-accent-termux' },
    { path: '/linux', label: 'Linux', icon: Code2, activeColor: 'text-accent-linux' },
    { path: '/cmd', label: 'CMD', icon: SquareTerminal, activeColor: 'text-accent-cmd' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3">
      <div className="bg-background-card/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          // Home should only be active on exact match, others on sub-paths too
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`relative flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-colors w-16 h-12 ${
                isActive ? item.activeColor : 'text-text-muted'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="bottomNavPill" 
                  className="absolute inset-0 bg-white/5 rounded-xl" 
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
