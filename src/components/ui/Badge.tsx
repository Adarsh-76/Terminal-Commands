interface BadgeProps {
  children: React.ReactNode;
  variant?: 'termux' | 'linux' | 'cmd' | 'default';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    termux: 'bg-accent-termux/10 text-accent-termux border-accent-termux/20',
    linux: 'bg-accent-linux/10 text-accent-linux border-accent-linux/20',
    cmd: 'bg-accent-cmd/10 text-accent-cmd border-accent-cmd/20',
    default: 'bg-white/5 text-text-secondary border-white/10',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
}
