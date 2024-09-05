import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getWeatherData } from "./lib";

const app = new Hono();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (c) => {
  const data = await getWeatherData();
  return c.json({ data});
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
