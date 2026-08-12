import FlexSearch from 'flexsearch';
import { allCommands } from '../data';
import type { Command } from '../types';

// Initialize the index
const index = new FlexSearch.Index({
  tokenize: 'forward', // Allows matching parts of words (e.g., "inst" matches "install")
  cache: true,
});

// Populate the index with our command data
allCommands.forEach((cmd) => {
  // Combine fields we want to search through
  const searchData = `${cmd.name} ${cmd.shortDescription} ${cmd.syntax} ${cmd.category}`;
  index.add(cmd.id, searchData);
});

export const searchCommands = (query: string): Command[] => {
  if (!query || query.trim().length < 1) return [];
  
  // Search the index, return up to 8 results
  const results = index.search(query, 8);
  
  // Map the IDs back to the actual Command objects
  return results
    .map(id => allCommands.find(cmd => cmd.id === id))
    .filter((cmd): cmd is Command => cmd !== undefined);
};
