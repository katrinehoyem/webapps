import { z } from "zod";

export const projectsSchema = z.object({
  title: z.string(),
  repoLink: z.string().min(3),
  description: z.string(),
  publishedAt: z.string(),
  tags: z.string(),
});



export const updateProjectSchema = projectsSchema.omit({
  description: true,
  publishedAt: true,
});

export const createProjectSchema = projectsSchema.omit({
  title: true,
  description: true,
  publishedAt: true,
  tags: true,
});

export type Project = z.infer<typeof projectsSchema>;

export const projectFromDbSchema = z.object({
  title: z.string(),
  repoLink: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ProjectFromDb = z.infer<typeof projectFromDbSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;

export const valtitleateCreateproject = (data: unknown) => {
  return createProjectSchema.safeParse(data);
};

export const valtitleateUpdateproject = (data: unknown) => {
  return updateProjectSchema.safeParse(data);
};

export const valtitleateproject = (data: unknown) => {
  return projectsSchema.safeParse(data);
};