export type Environment = 'termux' | 'linux' | 'cmd';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CommandExample {
  command: string;
  output?: string;
  explanation: string;
}

export interface CommandOption {
  flag: string;
  description: string;
}

export interface Command {
  id: string; // e.g., "pkg-install"
  environment: Environment;
  category: string; // e.g., "Package Management"
  name: string; // e.g., "pkg install"
  syntax: string;
  shortDescription: string;
  detailedExplanation: string;
  examples: CommandExample[];
  options?: CommandOption[];
  tips?: string[];
  warnings?: string[];
  relatedCommands?: string[]; // Array of command IDs
  popularPackages?: string[]; // Array of package names (e.g., for 'pkg install')
  difficulty: Difficulty;
}
