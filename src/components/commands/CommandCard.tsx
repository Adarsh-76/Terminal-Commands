import { useState } from 'react';
import { Link } from 'react-router';
import type { Command } from '../../types';
import Badge from '../ui/Badge';
import { Terminal, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommandCardProps {
  command: Command;
}

export default function CommandCard({ command }: CommandCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(command.syntax).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <Link to={`/${command.environment}/${command.id}`} className="block h-full">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -5 }}
        className="bg-background-card/40 backdrop-blur-md border border-white/5 rounded-xl shadow-lg p-5 h-full hover:border-white/20 transition-colors"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-text-muted flex-shrink-0" />
            <h3 className="text-lg font-mono font-semibold text-text-primary">
              {command.name}
            </h3>
          </div>
          <Badge variant={command.environment}>{command.difficulty}</Badge>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {command.shortDescription}
        </p>
        
        <div className="flex items-center justify-between gap-2 bg-background-subtle rounded-md px-3 py-2 border border-white/5">
          <code className="text-accent-termux text-xs font-mono break-all">
            {command.syntax}
          </code>
          <button 
            onClick={handleCopy}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0 p-1"
            aria-label="Copy syntax"
          >
            {copied ? <Check className="w-4 h-4 text-accent-termux" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
