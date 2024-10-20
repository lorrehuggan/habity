CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created DATE NOT NULL,
    color TEXT,
    streak INTEGER,
    category TEXT NOT NULL,
    status TEXT NOT NULL
);
