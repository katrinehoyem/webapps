import Database from "better-sqlite3";

export const db = new Database(env.DATABASE_URL);
export const DB = typeof db;

export default db;