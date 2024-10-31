import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    title TEXT PRIMARY KEY,
    repoLink TEXT NOT NULL,
    description TEXT NOT NULL,
    publishedAt TEXT NOT NULL,
    tags TEXT NOT NULL
  );
`);
};