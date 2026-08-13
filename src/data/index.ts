import type { Command } from '../types';
import { termuxPackageCommands } from './termux/packageManagement';
import { termuxFileCommands } from './termux/fileManagement';
import { linuxFileCommands } from './linux/fileManagement';
import { linuxSystemCommands } from './linux/systemManagement';
import { cmdFileCommands } from './cmd/fileDirectory';

// Combine all commands into a single array
export const allCommands: Command[] = [
  ...termuxPackageCommands,
  ...termuxFileCommands,
  ...linuxFileCommands,
  ...linuxSystemCommands,
  ...cmdFileCommands
];

// Helper function to get commands by environment
export const getCommandsByEnvironment = (environment: string): Command[] => {
  return allCommands.filter(cmd => cmd.environment === environment);
};

// Helper function to get a single command by its ID
export const getCommandById = (id: string): Command | undefined => {
  return allCommands.find(cmd => cmd.id === id);
};
