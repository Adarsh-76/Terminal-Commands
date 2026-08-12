import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div 
      className={`bg-background-card/40 backdrop-blur-md border border-white/5 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
