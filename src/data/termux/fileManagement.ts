import type { Command } from '../../types';

export const termuxFileCommands: Command[] = [
  {
    id: 'termux-ls',
    environment: 'termux',
    category: 'File Management',
    name: 'ls',
    syntax: 'ls [options] [path]',
    shortDescription: 'Lists directory contents.',
    detailedExplanation: 'The ls command lists the files and directories inside a given path. If no path is provided, it lists the contents of the current working directory.',
    examples: [
      {
        command: 'ls',
        output: 'Downloads\nMusic\ndcim\nstorage',
        explanation: 'Lists files and folders in the current directory.'
      },
      {
        command: 'ls -la ~/storage',
        output: 'drwx------  3 root root 4096 Nov  1 12:00 .\ndrwx------  4 root root 4096 Nov  1 12:00 ..\n-rw-------  1 root root    0 Nov  1 12:00 shared'
        // Removed trailing comma here
      }
    ],
    options: [
      { flag: '-l', description: 'Uses a long listing format (shows permissions, owner, size, and date).' },
      { flag: '-a', description: 'Shows hidden files (starting with a dot).' },
      { flag: '-h', description: 'Prints file sizes in human-readable formats (e.g., 1K, 2M, 3G).' }
    ],
    tips: ['Combine options for better visibility: ls -lah shows all files in a human-readable long format.'],
    relatedCommands: ['termux-cd'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-cd',
    environment: 'termux',
    category: 'File Management',
    name: 'cd',
    syntax: 'cd [path]',
    shortDescription: 'Changes the current working directory.',
    detailedExplanation: 'The cd command is used to navigate between directories. You can use absolute paths (starting from /) or relative paths (from your current location).',
    examples: [
      {
        command: 'cd ~/storage/shared',
        explanation: 'Navigates to the internal storage shared folder.'
      },
      {
        command: 'cd ..',
        explanation: 'Moves up one directory level.'
      }
    ],
    tips: [
      'Typing cd without a path takes you to your home directory (~).',
      'Use cd - to return to the previous directory you were in.'
    ],
    relatedCommands: ['termux-ls'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-mkdir',
    environment: 'termux',
    category: 'File Management',
    name: 'mkdir',
    syntax: 'mkdir [options] <directory_name>',
    shortDescription: 'Creates a new directory.',
    detailedExplanation: 'The mkdir command creates one or more new directories in the current location or a specified path.',
    examples: [
      {
        command: 'mkdir my_project',
        explanation: 'Creates a new directory named "my_project".'
      }
    ],
    options: [
      { flag: '-p', description: 'Creates parent directories if they do not exist. No error if the directory already exists.' }
    ],
    tips: ['Use mkdir -p path/to/folder to create an entire folder structure at once.'],
    relatedCommands: ['termux-touch'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-touch',
    environment: 'termux',
    category: 'File Management',
    name: 'touch',
    syntax: 'touch <file_name>',
    shortDescription: 'Creates an empty file or updates timestamps.',
    detailedExplanation: 'The touch command creates a new, empty file if it does not already exist. If the file exists, it updates the modification and access times.',
    examples: [
      {
        command: 'touch script.sh',
        explanation: 'Creates an empty shell script file named "script.sh".'
      }
    ],
    relatedCommands: ['termux-mkdir'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-cp',
    environment: 'termux',
    category: 'File Management',
    name: 'cp',
    syntax: 'cp [options] <source> <destination>',
    shortDescription: 'Copies files or directories.',
    detailedExplanation: 'The cp command copies a file from a source location to a destination. To copy directories, you must use the recursive flag.',
    examples: [
      {
        command: 'cp file.txt backup.txt',
        explanation: 'Creates a copy of "file.txt" named "backup.txt".'
      },
      {
        command: 'cp -r my_folder /sdcard/',
        explanation: 'Copies the entire "my_folder" directory to your device\'s SD card.'
      }
    ],
    options: [
      { flag: '-r', description: 'Recursively copies directories and their contents.' },
      { flag: '-i', description: 'Prompts for confirmation before overwriting an existing file.' }
    ],
    warnings: ['Without the -i flag, cp will silently overwrite existing files without asking.'],
    relatedCommands: ['termux-mv'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-mv',
    environment: 'termux',
    category: 'File Management',
    name: 'mv',
    syntax: 'mv <source> <destination>',
    shortDescription: 'Moves or renames files and directories.',
    detailedExplanation: 'The mv command moves a file from one location to another. It is also used to rename files or directories, since moving a file to a new name in the same directory effectively renames it.',
    examples: [
      {
        command: 'mv oldname.txt newname.txt',
        explanation: 'Renames "oldname.txt" to "newname.txt".'
      },
      {
        command: 'mv file.txt ~/storage/shared/',
        explanation: 'Moves "file.txt" to the device\'s shared storage.'
      }
    ],
    warnings: ['mv will overwrite the destination file if it already exists. Use with caution.'],
    relatedCommands: ['termux-cp'],
    difficulty: 'Beginner'
  },
  {
    id: 'termux-rm',
    environment: 'termux',
    category: 'File Management',
    name: 'rm',
    syntax: 'rm [options] <file_or_directory>',
    shortDescription: 'Removes files or directories.',
    detailedExplanation: 'The rm command deletes files or directories permanently. Unlike a graphical interface, there is no "Recycle Bin" or trash in the terminal; deleted files are gone immediately.',
    examples: [
      {
        command: 'rm unwanted_file.txt',
        explanation: 'Deletes the file "unwanted_file.txt".'
      },
      {
        command: 'rm -r old_project_folder',
        explanation: 'Deletes the directory "old_project_folder" and everything inside it.'
      }
    ],
    options: [
      { flag: '-r', description: 'Removes directories and their contents recursively.' },
      { flag: '-f', description: 'Forces deletion without prompting for confirmation.' },
      { flag: '-i', description: 'Prompts for confirmation before every removal.' }
    ],
    warnings: [
      'Be extremely careful with rm -rf. It can delete your entire Termux installation or shared storage instantly if used incorrectly.',
      'Never run rm -rf / or similar commands.'
    ],
    relatedCommands: ['termux-mkdir'],
    difficulty: 'Intermediate'
  },
  {
    id: 'termux-cat',
    environment: 'termux',
    category: 'File Management',
    name: 'cat',
    syntax: 'cat <file_name>',
    shortDescription: 'Concatenates and displays file contents.',
    detailedExplanation: 'The cat command reads data from files and outputs their contents to the terminal. It is commonly used to quickly view the contents of text files without opening an editor.',
    examples: [
      {
        command: 'cat ~/.bashrc',
        output: '# ~/.bashrc: executed by bash(1) for non-login shells.\nexport PATH...',
        explanation: 'Displays the contents of the .bashrc configuration file.'
      }
    ],
    tips: ['Use cat file1 file2 > combined.txt to merge multiple files into one.'],
    relatedCommands: ['termux-touch'],
    difficulty: 'Beginner'
  }
];
