import type { Command } from '../../types';

export const linuxSystemCommands: Command[] = [
  {
    id: 'linux-ps',
    environment: 'linux',
    category: 'System Management',
    name: 'ps',
    syntax: 'ps [options]',
    shortDescription: 'Reports a snapshot of current processes.',
    detailedExplanation: 'The ps command displays information about a selection of the active processes. It is commonly used to find the Process ID (PID) of a running application so you can manage it (e.g., kill it).',
    examples: [
      {
        command: 'ps aux',
        output: 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.0  16992  9804 ?        Ss   Nov01   0:05 /sbin/init',
        explanation: 'Displays all running processes on the system in BSD syntax.'
      },
      {
        command: 'ps -ef | grep nginx',
        output: 'root      1234  1  0 Nov01 ?        00:00:01 nginx: master process',
        explanation: 'Filters the process list to find all running nginx processes.'
      }
    ],
    options: [
      { flag: 'aux', description: 'Shows all processes for all users (BSD syntax).' },
      { flag: '-ef', description: 'Shows all processes in full format listing (System V syntax).' }
    ],
    tips: ['Combine ps with grep to quickly find a specific process by name.'],
    relatedCommands: ['linux-kill', 'linux-top'],
    difficulty: 'Intermediate'
  },
  {
    id: 'linux-top',
    environment: 'linux',
    category: 'System Management',
    name: 'top',
    syntax: 'top',
    shortDescription: 'Displays dynamic real-time system processes and resource usage.',
    detailedExplanation: 'The top command provides a real-time, dynamic view of the running system. It shows system summary information (CPU, RAM, load average) and a list of processes or threads currently being managed by the Linux kernel.',
    examples: [
      {
        command: 'top',
        output: 'top - 12:00:00 up 10 days,  2:30,  1 user,  load average: 0.20, 0.15, 0.10\nTasks: 100 total,   1 running,  99 sleeping...\n%Cpu(s):  2.0 us,  1.0 sy,  0.0 ni, 97.0 id...',
        explanation: 'Launches the interactive task manager. Press q to quit.'
      }
    ],
    tips: [
      'Press "k" inside top to kill a process by entering its PID.',
      'Press "M" inside top to sort processes by Memory usage.',
      'Press "P" inside top to sort processes by CPU usage.'
    ],
    relatedCommands: ['linux-ps', 'linux-kill'],
    difficulty: 'Intermediate'
  },
  {
    id: 'linux-kill',
    environment: 'linux',
    category: 'System Management',
    name: 'kill',
    syntax: 'kill [signal] <PID>',
    shortDescription: 'Sends a signal to a process, usually to terminate it.',
    detailedExplanation: 'The kill command sends a specific signal to a running process using its Process ID (PID). By default, it sends the TERM signal (15), which asks the process to shut down gracefully. If the process is frozen, you can send the KILL signal (9) to force it to close immediately.',
    examples: [
      {
        command: 'kill 1234',
        explanation: 'Politely asks process 1234 to terminate (SIGTERM).'
      },
      {
        command: 'kill -9 1234',
        explanation: 'Forcefully and immediately kills process 1234 (SIGKILL).'
      }
    ],
    options: [
      { flag: '-9', description: 'Sends the SIGKILL signal. Forces immediate termination without cleanup.' },
      { flag: '-15', description: 'Sends the SIGTERM signal. Requests graceful shutdown (default).' }
    ],
    warnings: [
      'Always try kill -15 first. Using kill -9 can leave orphaned temporary files or corrupted databases.',
      'Never kill PID 1 (the init system) unless you are trying to shut down the computer.'
    ],
    relatedCommands: ['linux-ps', 'linux-top'],
    difficulty: 'Intermediate'
  },
  {
    id: 'linux-df',
    environment: 'linux',
    category: 'System Management',
    name: 'df',
    syntax: 'df [options] [file]',
    shortDescription: 'Reports file system disk space usage.',
    detailedExplanation: 'The df command displays the amount of disk space available and used on all mounted file systems. It is the quickest way to find out if your server is running out of storage.',
    examples: [
      {
        command: 'df -h',
        output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   20G   30G  40% /\ntmpfs            2.0G     0  2.0G   0% /dev/shm',
        explanation: 'Displays disk usage for all file systems in human-readable sizes (MB, GB).'
      }
    ],
    options: [
      { flag: '-h', description: 'Prints sizes in powers of 1024 (e.g., 1023M, 2G).' },
      { flag: '-T', description: 'Prints the file system type (e.g., ext4, xfs).' }
    ],
    relatedCommands: ['linux-du'],
    difficulty: 'Beginner'
  },
  {
    id: 'linux-du',
    environment: 'linux',
    category: 'System Management',
    name: 'du',
    syntax: 'du [options] [path]',
    shortDescription: 'Estimates file and directory space usage.',
    detailedExplanation: 'While df shows overall disk space, du shows how much space specific files and folders are taking up. It is used to find large files or directories that are eating up your disk space.',
    examples: [
      {
        command: 'du -sh /var/log',
        output: '450M\t/var/log',
        explanation: 'Shows the total size of the /var/log directory in human-readable format.'
      },
      {
        command: 'du -h --max-depth=1 /',
        explanation: 'Shows the size of all top-level directories in the root folder.'
      }
    ],
    options: [
      { flag: '-s', description: 'Displays only a total for each argument (summary).' },
      { flag: '-h', description: 'Prints sizes in human-readable formats.' }
    ],
    tips: ['Combine with sort: du -sh * | sort -rh to find the largest files in a directory.'],
    relatedCommands: ['linux-df'],
    difficulty: 'Intermediate'
  },
  {
    id: 'linux-uname',
    environment: 'linux',
    category: 'System Management',
    name: 'uname',
    syntax: 'uname [options]',
    shortDescription: 'Prints system information.',
    detailedExplanation: 'The uname command prints information about the current system. It is commonly used to check the Linux kernel version and system architecture.',
    examples: [
      {
        command: 'uname -a',
        output: 'Linux myserver 5.15.0-76-generic #86-Ubuntu SMP x86_64 GNU/Linux',
        explanation: 'Prints all available system information.'
      }
    ],
    options: [
      { flag: '-a', description: 'Prints all information (kernel name, hostname, kernel release, architecture).' },
      { flag: '-r', description: 'Prints only the kernel release version.' },
      { flag: '-m', description: 'Prints the machine hardware name (e.g., x86_64).' }
    ],
    relatedCommands: [],
    difficulty: 'Beginner'
  }
];
