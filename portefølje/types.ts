import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
});


export const ProjectsCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectsCreateSchema>;