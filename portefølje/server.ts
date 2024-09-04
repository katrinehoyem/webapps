import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from 'node:fs/promises';
import { ProjectSchema, type Project } from "./types";
const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const projects: Project[] = [];

app.get("/json", async (c) => {
  const data = await fs.readFile("./projects.json", "utf8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  // Validerer at dataen vi mottar er en gyldig Habit
  const project = ProjectSchema.parse(newProject);
  // Sjekker om habit er en gyldig Habit, og returnerer en feilmelding hvis ikke
  if (!project) return c.json({ error: "Invalid habit" }, { status: 400 });
  console.log(project);
  projects.push(project);

  // Returnerer en liste med alle habits. Bruker generisk type for å fortelle at vi returnerer en array av Habit
  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  // Returnerer en liste med alle habits. Bruker generisk type for å fortelle at vi returnerer en array av Habit
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});