-- Table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Table for command comments
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  command_id TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index to quickly fetch comments for a specific command
CREATE INDEX IF NOT EXISTS idx_comments_command_id ON comments(command_id);
