import type { Project, ProjectFromDb, ProjectRespons } from "./project.schema";

const createtitle = () => {
  return crypto.randomUUID();
};

export const createProjectRespons = (project: Project): ProjectRespons => {
  const { repoLink } = project;
  const [firstrepoLink, ...rest] = repoLink.split(" ");

  return {
    ...project,
    firstrepoLink,
    lastrepoLink: rest?.at(-1) ?? "",
    avatar: repoLink[0],
  };
};

export const fromDb = (project: ProjectFromDb) => {
  return {
    title: project.title,
    repoLink: project.repoLink,
    description: project.description,
    publishedAt: new Date(project.published_at).toISOString(),
    tags: project.tags
  };
};

export const createproject = (project: Partial<Project>): Project => {
  return {
    title: project.title ?? createtitle(),
    repoLink: project.repoLink ?? "",
    description: project?.description ?? "",
    publishedAt: project?.publishedAt ?? new Date().toISOString(),
    taga: project?.tags ?? ""
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