import type { Command } from '../../types';

export const termuxPackageCommands: Command[] = [
  {
    id: 'pkg-install',
    environment: 'termux',
    category: 'Package Management',
    name: 'pkg install',
    syntax: 'pkg install <package_name>',
    shortDescription: 'Installs a new package in Termux.',
    detailedExplanation: 'The pkg install command is used to install new software packages in Termux. It fetches the package from the Termux repositories and sets it up on your device.',
    examples: [
      {
        command: 'pkg install python',
        output: 'Installing python...\nDone.',
        explanation: 'Installs the Python programming language.'
      }
    ],
    options: [
      { flag: '-y', description: 'Automatically answer yes to all prompts.' }
    ],
    tips: ['You can install multiple packages at once: pkg install git python'],
    warnings: ['Ensure you have enough storage space before installing large packages.'],
    relatedCommands: ['pkg-search', 'pkg-uninstall'],
    popularPackages: [
      'git', 'python', 'nodejs', 'openssh', 'nano', 'vim', 'wget', 'curl', 'htop', 'nmap'
    ],
    difficulty: 'Beginner'
  },
  {
    id: 'pkg-update',
    environment: 'termux',
    category: 'Package Management',
    name: 'pkg update',
    syntax: 'pkg update',
    shortDescription: 'Updates the list of available packages.',
    detailedExplanation: 'Before installing or upgrading packages, it is recommended to run pkg update to refresh the local package index from the Termux repositories.',
    examples: [
      {
        command: 'pkg update',
        output: 'Hit:1 https://packages.termux.dev/apt/termux-main stable InRelease\nReading package lists... Done',
        explanation: 'Fetches the latest list of available packages.'
      }
    ],
    tips: ['Run this before running pkg upgrade.'],
    relatedCommands: ['pkg-upgrade', 'pkg-install'],
    difficulty: 'Beginner'
  }
];
