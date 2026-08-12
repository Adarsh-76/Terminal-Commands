import type { Command } from '../../types';

export const linuxFileCommands: Command[] = [
  {
    id: 'ls',
    environment: 'linux',
    category: 'File Management',
    name: 'ls',
    syntax: 'ls [OPTION]... [FILE]...',
    shortDescription: 'Lists directory contents.',
    detailedExplanation: 'The ls command lists the files and directories within a file system. It is one of the most frequently used commands in Linux.',
    examples: [
      {
        command: 'ls -l',
        output: 'drwxr-xr-x 2 user user 4096 Jan 1 12:00 Documents\n-rw-r--r-- 1 user user  512 Jan 1 12:00 file.txt',
        explanation: 'Lists files in long format, showing permissions, owner, size, and modification date.'
      }
    ],
    options: [
      { flag: '-a', description: 'Show hidden files (starting with a dot).' },
      { flag: '-l', description: 'Use a long listing format.' },
      { flag: '-h', description: 'Print sizes in human-readable format (e.g., 1K, 234M).' }
    ],
    tips: ['Use ls -lah to list all files in human-readable long format.'],
    relatedCommands: ['cd', 'mkdir'],
    difficulty: 'Beginner'
  }
];
