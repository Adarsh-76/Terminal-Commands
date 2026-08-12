import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Terminal } from 'lucide-react';
import { searchCommands } from '../../lib/search';
import Badge from '../ui/Badge';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchCommands(''));
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    setResults(searchCommands(value));
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Delay to allow click events
          placeholder="Search commands... (e.g., install, list, network)"
          className="w-full pl-12 pr-12 py-4 bg-background-card/60 backdrop-blur-md border border-white/10 rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-background-card/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {results.length > 0 ? (
              <ul className="max-h-[60vh] overflow-y-auto">
                {results.map((cmd) => (
                  <li key={cmd.id}>
                    <Link
                      to={`/${cmd.environment}/${cmd.id}`}
                      onClick={clearSearch}
                      className="flex items-center justify-between gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Terminal className="w-4 h-4 text-text-muted flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-mono font-medium text-text-primary truncate">{cmd.name}</p>
                          <p className="text-text-muted text-sm truncate">{cmd.shortDescription}</p>
                        </div>
                      </div>
                      <Badge variant={cmd.environment}>{cmd.environment.toUpperCase()}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-text-muted">
                No commands found matching "{query}".
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
