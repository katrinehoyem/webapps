import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "./db";
import type { Project } from "../features/projects/types/project.schema";

export const seed = async (db: DB) => {
  const path = join(import.meta.dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  const { projects } = JSON.parse(file) as {
    projects: Project[];
  };

  const insertproject = db.prepare(`
  INSERT INTO projects (title, repoLink, description, publishedAt, tags) VALUES (?, ?, ?, ?, ?)
`);

  db.transaction(() => {
    for (const project of projects) {
      insertproject.run(
        project.title,
        project.repoLink,
        project.description,
        project.publishedAt,
        project.tags
      );
    }
  })();
};