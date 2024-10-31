import { db, type DB } from "../../../db/db";
import type {
  CreateProject,
  Project,
  ProjectFromDb,
  UpdateProject,
} from "../types/project.schema";
import type { Result } from "../../../types/index";
import { fromDb, toDb } from "../mappers/project.mapper";
import type { Query } from "../../../lib/query";

export const createprojectRepository = (db: DB) => {
  const exist = async (title: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE title = ?"
    );
    const data = query.get(title) as { count: number };
    return data.count > 0;
  };

  const getBytitle = async (title: string): Promise<Result<Project>> => {
    try {
      const project = await exist(title);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "project not found" },
        };
      const query = db.prepare("SELECT * FROM projects WHERE title = ?");
      const data = query.get(title) as ProjectFromDb;
      return {
        success: true,
        data: fromDb(data),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av project",
        },
      };
    }
  };

  const list = async (params?: Query): Promise<Result<Project[]>> => {
    try {
      const { title, pageSize = 10, page = 0 } = params ?? {};

      const offset = (Number(page) - 1) * Number(pageSize);

      const hasPagination = Number(page) > 0;

      let query = "SELECT * FROM projects";
      query += title ? `WHERE repoLink LIKE '%${title}%'` : "";
      query += pageSize ? ` LIMIT ${pageSize}` : "";
      query += offset ? ` OFFSET ${offset}` : "";

      const statement = db.prepare(query);

      const data = statement.all() as ProjectFromDb[];

      const { total } = db
        .prepare("SELECT COUNT(*) as total from projects")
        .get() as {
        total: number;
      };

      const totalPages = Math.ceil(total / Number(pageSize ?? 1));
      const hasNextPage = Number(page) < totalPages;
      const hasPreviousPage = Number(page ?? 1) > 1;

      return {
        success: true,
        data: data.map(fromDb),
        ...(hasPagination
          ? {
              total: data.length,
              pageSize,
              page,
              totalPages,
              hasNextPage,
              hasPreviousPage,
            }
          : {}),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av projecter",
        },
      };
    }
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    try {
      const project = toDb(data);

      const query = db.prepare(`
        INSERT INTO projects (title, repoLink, description, publishedAt, tags)
        VALUES (?, ?, ?, ?, ?)
      `);

      query.run(
        project.title,
        project.repoLink,
        project.description,
        project.publishedAt,
        project.tags
      );
      return {
        success: true,
        data: project.title,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppretting av project",
        },
      };
    }
  };

  const update = async (data: UpdateProject): Promise<Result<Project>> => {
    try {
      const projectExist = await exist(data.title);

      if (!projectExist)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "project not found" },
        };

      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET repoLink = ?, publishedAt = ?
        WHERE title = ?
      `);

      query.run(project.repoLink, project.publishedAt, project.title);
      return {
        success: true,
        data: fromDb(project),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppdatering av project",
        },
      };
    }
  };

  const remove = async (title: string): Promise<Result<string>> => {
    try {
      const project = await exist(title);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "project not found" },
        };
      const query = db.prepare("DELETE FROM projects WHERE title = ?");
      query.run(title);
      return {
        success: true,
        data: title,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med sletting av project",
        },
      };
    }
  };

  return { create, list, getBytitle, update, remove };
};

export const projectRepository = createprojectRepository(db);

export type projectRepository = ReturnType<typeof createprojectRepository>;