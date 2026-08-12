import { Link } from 'react-router';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/forms/SearchBar';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { Terminal, Clock, ArrowRight, Download, Smartphone } from 'lucide-react';

export default function Home() {
  const { recentCommands } = useRecentlyViewed();
  const { canInstall, promptToInstall } = usePwaInstall();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Master the Terminal
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto mb-8">
          A professional, comprehensive reference for Termux, Linux, and Windows CMD commands.
        </p>
        <SearchBar />
      </div>

      {/* PWA Install Banner */}
      {canInstall && (
        <div className="mb-12 flex justify-center">
          <GlassCard className="p-6 max-w-3xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-accent-termux/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-termux/10 rounded-lg">
                <Smartphone className="w-6 h-6 text-accent-termux" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-text-primary">Install Terminal Reference</h3>
                <p className="text-text-muted text-sm">Add to your home screen for offline access.</p>
              </div>
            </div>
            <button
              onClick={promptToInstall}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent-termux text-white font-medium rounded-lg hover:bg-accent-termux/90 transition-colors shadow-lg shadow-accent-termux/20"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          </GlassCard>
        </div>
      )}

      {/* Recently Viewed Section */}
      {recentCommands.length > 0 && (
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4" />
            Recently Viewed
          </h2>
          <div className="flex flex-wrap gap-3">
            {recentCommands.map((cmd) => (
              <Link
                key={cmd.id}
                to={`/${cmd.environment}/${cmd.id}`}
                className="flex items-center gap-3 p-3 bg-background-card/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-white/20 transition-colors group"
              >
                <Terminal className="w-4 h-4 text-text-muted group-hover:text-accent-termux transition-colors" />
                <div>
                  <p className="font-mono font-medium text-text-primary text-sm">{cmd.name}</p>
                  <p className="text-text-muted text-xs">{cmd.environment.toUpperCase()}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Environment Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/termux">
          <GlassCard className="p-8 hover:border-accent-termux/30 transition-colors h-full">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Termux</h2>
            <Badge variant="termux">Android Terminal</Badge>
            <p className="mt-4 text-text-secondary">Commands for package management, file operations, and development on Android.</p>
          </GlassCard>
        </Link>

        <Link to="/linux">
          <GlassCard className="p-8 hover:border-accent-linux/30 transition-colors h-full">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Linux</h2>
            <Badge variant="linux">Distributions</Badge>
            <p className="mt-4 text-text-secondary">Standard GNU/Linux commands for system administration, networking, and more.</p>
          </GlassCard>
        </Link>

        <Link to="/cmd">
          <GlassCard className="p-8 hover:border-accent-cmd/30 transition-colors h-full">
            <h2 className="text-2xl font-bold text-text-primary mb-2">CMD</h2>
            <Badge variant="cmd">Windows</Badge>
            <p className="mt-4 text-text-secondary">Windows Command Prompt commands for file management, system info, and networking.</p>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
