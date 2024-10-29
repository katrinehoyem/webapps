import { z } from "zod";
import { DateValues } from "date-fns";

export const ProjectSchema = z.object({
  id: z.string(),
  project_name: z.string(),
  description: z.string(),
  repo_link: z.string(),
  published_at: z.datetimeRegex(),
  tags: z.string();

});

export const ProjectCreateSchema = ProjectSchema.omit({ project_name: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;