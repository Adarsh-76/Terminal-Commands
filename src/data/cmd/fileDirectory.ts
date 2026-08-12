import type { Command } from '../../types';

export const cmdFileCommands: Command[] = [
  {
    id: 'dir',
    environment: 'cmd',
    category: 'File and Directory Management',
    name: 'dir',
    syntax: 'dir [drive:][path][filename]',
    shortDescription: 'Displays a list of files and subdirectories in a directory.',
    detailedExplanation: 'The dir command is used in the Windows Command Prompt to view a list of files and folders in the current directory or a specified directory.',
    examples: [
      {
        command: 'dir',
        output: ' Volume in drive C is OS\n Directory of C:\\Users\\User\n01/01/2024  12:00 PM    <DIR>          Documents\n01/01/2024  12:00 PM             1,024 file.txt',
        explanation: 'Lists the contents of the current directory.'
      }
    ],
    options: [
      { flag: '/p', description: 'Displays one screen of the list at a time.' },
      { flag: '/w', description: 'Uses a wide list format.' }
    ],
    tips: ['Use dir /w for a cleaner, multi-column view.'],
    relatedCommands: ['cd', 'mkdir'],
    difficulty: 'Beginner'
  }
];
