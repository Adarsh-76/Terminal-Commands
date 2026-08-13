import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { getCommandById, getCommandsByEnvironment } from '../data';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import TerminalBlock from '../components/ui/TerminalBlock';
import { ArrowLeft, AlertTriangle, Lightbulb, Link2, ArrowRight } from 'lucide-react';
import CommentSection from '../components/commands/CommentSection';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

export default function CommandDetailPage() {
  const { commandId } = useParams();
  const command = getCommandById(commandId || '');

  if (!command) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-text-secondary">Command not found.</p>
        <Link to="/" className="text-accent-termux hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get all commands for the current environment to display at the end
  const allEnvCommands = getCommandsByEnvironment(command.environment);

  // Track recently viewed
  const { addRecentlyViewed } = useRecentlyViewed();
  useEffect(() => {
    addRecentlyViewed(command.id);
  }, [command.id, addRecentlyViewed]);

  // Added pb-28 to prevent content from hiding behind the BottomNav
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28">
      <Link
        to={`/${command.environment}`}
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {command.environment.toUpperCase()}
      </Link>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary font-mono">
          {command.name}
        </h1>
        <Badge variant={command.environment}>{command.environment.toUpperCase()}</Badge>
        <Badge>{command.difficulty}</Badge>
      </div>

      <p className="text-text-secondary text-lg mb-8">{command.shortDescription}</p>

      <div className="mb-8">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Syntax</h2>
        <TerminalBlock code={command.syntax} label="Syntax" />
      </div>

      <GlassCard className="p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-3">Explanation</h2>
        <p className="text-text-secondary leading-relaxed">{command.detailedExplanation}</p>
      </GlassCard>

      {command.examples && command.examples.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Examples</h2>
          <div className="space-y-4">
            {command.examples.map((ex, idx) => (
              <div key={idx} className="space-y-2">
                <TerminalBlock code={ex.command} label={`Example ${idx + 1}`} />
                {ex.output && (
                  <TerminalBlock code={ex.output} label="Output" isOutput={true} showPrompt={false} />
                )}
                <p className="text-text-secondary text-sm px-1">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {command.options && command.options.length > 0 && (
        <GlassCard className="p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Options</h2>
          <div className="space-y-3">
            {command.options.map((opt, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <code className="text-accent-termux font-mono text-sm sm:w-32 flex-shrink-0 bg-background-subtle px-2 py-1 rounded h-fit">{opt.flag}</code>
                <span className="text-text-secondary text-sm">{opt.description}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {command.warnings && command.warnings.length > 0 && (
          <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-red-400 font-medium mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-semibold">Warnings</span>
            </div>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-1.5">
              {command.warnings.map((warn, idx) => <li key={idx}>{warn}</li>)}
            </ul>
          </div>
        )}

        {command.tips && command.tips.length > 0 && (
          <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-yellow-400 font-medium mb-3">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-semibold">Tips</span>
            </div>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-1.5">
              {command.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
            </ul>
          </div>
        )}
      </div>

      {command.relatedCommands && command.relatedCommands.length > 0 && (
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            <Link2 className="w-4 h-4" />
            Related Commands
          </h2>
          <div className="flex flex-wrap gap-2">
            {command.relatedCommands.map((relId) => {
              const relCmd = getCommandById(relId);
              if (!relCmd) return null;

              return (
                <Link
                  key={relId}
                  to={`/${relCmd.environment}/${relCmd.id}`}
                  className="px-3 py-1.5 bg-background-card border border-white/10 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors font-mono"
                >
                  {relCmd.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {command.popularPackages && command.popularPackages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            Popular Packages
          </h2>
          <div className="flex flex-wrap gap-2">
            {command.popularPackages.map((pkg) => (
              <span
                key={pkg}
                className="px-3 py-1.5 bg-background-subtle border border-white/10 rounded-lg text-sm text-accent-termux font-mono"
              >
                {pkg}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* All Commands in Environment Section */}
      <div className="mt-12 pt-8 border-t border-white/5">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          All {command.environment.toUpperCase()} Commands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allEnvCommands.map((cmd) => (
            <Link
              key={cmd.id}
              to={`/${cmd.environment}/${cmd.id}`}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                cmd.id === command.id
                  ? 'bg-background-card border-accent-termux/30 text-text-primary'
                  : 'bg-background-subtle/50 border-white/5 text-text-secondary hover:text-text-primary hover:border-white/10'
              }`}
            >
              <span className="font-mono text-sm">{cmd.name}</span>
              <ArrowRight className={`w-4 h-4 ${cmd.id === command.id ? 'text-accent-termux' : 'text-text-muted'}`} />
            </Link>
          ))}
        </div>
      </div>
      <CommentSection commandId={command.id} />
    </div>
  );
}
