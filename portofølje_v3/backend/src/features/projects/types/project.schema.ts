import { z } from "zod";

export const projectsSchema = z.object({
  title: z.string(),
  repoLink: z.string().min(3),
  description: z.string(),
  publishedAt: z.string(),
  tags: z.string(),
});


export const projectResponseSchema = projectsSchema.extend({
  title: z.string(),
 
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
  description: z.string(),
  publishedAt: z.string(),
  tags: z.string()
});

export type ProjectFromDb = z.infer<typeof projectFromDbSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>;

export const valdateCreateproject = (data: unknown) => {
  return createProjectSchema.safeParse(data);
};

export const validateUpdateproject = (data: unknown) => {
  return updateProjectSchema.safeParse(data);
};

export const validateProjectResponse = (data: unknown) => {
  return projectResponseSchema.safeParse(data);
};

export const validateproject = (data: unknown) => {
  return projectsSchema.safeParse(data);
};