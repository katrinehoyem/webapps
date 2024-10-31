import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

app.use('/*', cors());

app.use('/static/*', serveStatic({ root: './' }));

const projects = [];

app.post('/add', async (c) => {
  try {
    const newProject = await c.req.json();

    if (!newProject || !newProject.title || !newProject.repoLink || !newProject.description) {
      return c.json({ error: 'Invalid project' }, 400);
    }

    projects.push(newProject);

    return c.json(projects, 201);
  } catch (error) {
    return c.json({ error: 'Failed to add project' }, 500);
  }
});

app.get('/projects', (c) => {
  return c.json(projects);
});

const port = 8787;

console.log(`Server is now running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
