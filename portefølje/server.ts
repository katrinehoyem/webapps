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
  const project = ProjectSchema.parse(newProject);
  if (!project) return c.json({ error: "Invalid habit" }, { status: 400 });
  console.log(project);
  projects.push(project);

  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});