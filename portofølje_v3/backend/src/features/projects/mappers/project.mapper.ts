import type { Project, ProjectFromDb, } from "../types/project.schema";

const createtitle = () => {
  return crypto.randomUUID();
};



export const fromDb = (project: ProjectFromDb) => {
  return {
    title: project.title,
    repoLink: project.repoLink,
    description: project.description,
    publishedAt: new Date(project.publishedAt).toISOString(),
    tags: project.tags
  };
};

export const createproject = (project: Partial<Project>): Project => {
  return {
    title: project.title ?? createtitle(),
    repoLink: project.repoLink ?? "",
    description: project?.description ?? "",
    publishedAt: project?.publishedAt ?? new Date().toISOString(),
    tags: project?.tags ?? ""
  };
};

export const toDb = (data: Partial<Project>) => {
  const project = createproject(data);

  return {
    title: project.title,
    repoLink: project.repoLink,
    description: project.description,
    publishedAt: project.publishedAt,
    tags: project.tags
  };
};