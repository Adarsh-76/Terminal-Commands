import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TerminalBlockProps {
  code: string;
  label?: string;
  showPrompt?: boolean;
  isOutput?: boolean;
}

export default function TerminalBlock({ code, label, showPrompt = true, isOutput = false }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="bg-background-subtle rounded-lg border border-white/5 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-background/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
          </div>
          {label && <span className="text-text-muted text-xs ml-2 font-mono">{label}</span>}
        </div>
        <button 
          onClick={handleCopy}
          className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 text-xs"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-termux" />
              <span className="text-accent-termux">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Terminal Body */}
      <div className="p-4 overflow-x-auto">
        <pre className={`font-mono text-sm ${isOutput ? 'text-text-muted' : 'text-text-primary'} whitespace-pre-wrap break-all`}>
          {showPrompt && !isOutput && <span className="text-accent-termux select-none">$ </span>}
          {code}
        </pre>
      </div>
    </div>
  );
}
