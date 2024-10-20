CREATE TABLE IF NOT EXISTS commits (
    id TEXT PRIMARY KEY,
    message TEXT,
    image TEXT,
    created TEXT,
    status TEXT,
    completions INTEGER,
    habit_id TEXT,
    FOREIGN KEY (habit_id) REFERENCES habits(id)
);
