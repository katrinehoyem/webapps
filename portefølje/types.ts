import { z } from "zod";

// Definerer et Zod-skjema for Habit
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.coerce.date(),
});

// Definerer et Zod-skjema for å opprette en ny Habit
export const ProjectsCreateSchema = ProjectSchema.omit({ id: true });

// Definerer et Zod-skjema for en array av Habit
export const ProjectArraySchema = z.array(ProjectSchema);

// Oppdatert type-definisjon basert på Zod-skjemaet
export type Habit = z.infer<typeof ProjectSchema>;

// Oppdatert type-definisjon basert på Zod-skjemaet
export type CreateHabit = z.infer<typeof ProjectsCreateSchema>;