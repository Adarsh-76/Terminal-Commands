import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { getCommandsByEnvironment } from '../data';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import CommandCard from '../components/commands/CommandCard';
import { motion } from 'framer-motion';

export default function CommandEnvironmentPage() {
  const { environment } = useParams();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const envData: Record<string, { title: string; variant: 'termux' | 'linux' | 'cmd'; description: string }> = {
    termux: { title: 'Termux Commands', variant: 'termux', description: 'Android terminal emulator and Linux environment app.' },
    linux: { title: 'Linux Commands', variant: 'linux', description: 'Standard commands for Linux distributions.' },
    cmd: { title: 'Windows CMD Commands', variant: 'cmd', description: 'Command interpreter for Windows operating systems.' }
  };

  const currentEnv = environment || 'termux';
  const data = envData[currentEnv];

  const commands = useMemo(() => getCommandsByEnvironment(currentEnv), [currentEnv]);
  
  const categories = useMemo(() => {
    const cats = new Set(commands.map(cmd => cmd.category));
    return ['All', ...Array.from(cats)];
  }, [commands]);

  const filteredCommands = useMemo(() => {
    if (activeCategory === 'All') return commands;
    return commands.filter(cmd => cmd.category === activeCategory);
  }, [commands, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <GlassCard className="p-6 md:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">{data.title}</h1>
          <Badge variant={data.variant}>{filteredCommands.length} Commands</Badge>
        </div>
        <p className="text-text-secondary">{data.description}</p>
      </GlassCard>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar / Topbar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors text-left ${
                  activeCategory === cat
                    ? 'bg-background-card text-text-primary border border-white/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-background-subtle border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Commands Grid */}
        <div className="flex-grow">
          {filteredCommands.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.05 }}
            >
              {filteredCommands.map((cmd) => (
                <CommandCard key={cmd.id} command={cmd} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-text-muted">
              No commands found in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
