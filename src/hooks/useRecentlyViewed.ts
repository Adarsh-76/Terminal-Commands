import { useState, useEffect } from 'react';
import { allCommands } from '../data';
import type { Command } from '../types';

const STORAGE_KEY = 'recently_viewed_commands';
const MAX_RECENT = 5;

export const useRecentlyViewed = () => {
  const [recentCommands, setRecentCommands] = useState<Command[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        // Map IDs back to actual command objects
        const commands = ids
          .map(id => allCommands.find(cmd => cmd.id === id))
          .filter((cmd): cmd is Command => cmd !== undefined);
        setRecentCommands(commands);
      }
    } catch (error) {
      console.error('Failed to load recently viewed commands:', error);
    }
  }, []);

  // Function to add a command to the recently viewed list
  const addRecentlyViewed = (commandId: string) => {
    const command = allCommands.find(cmd => cmd.id === commandId);
    if (!command) return;

    setRecentCommands((prev) => {
      // Remove if already exists to move it to the front
      const filtered = prev.filter(cmd => cmd.id !== commandId);
      const updated = [command, ...filtered].slice(0, MAX_RECENT);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(cmd => cmd.id)));
      } catch (error) {
        console.error('Failed to save recently viewed commands:', error);
      }
      
      return updated;
    });
  };

  return { recentCommands, addRecentlyViewed };
};
