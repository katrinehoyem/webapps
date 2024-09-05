import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getWeatherData } from "./lib";
import { error } from "console";

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
app.post("/", async (c) => {
  const body = await c.req.json();
  if(!body.place) return c.json({error:"missing place"}, 400);
  return c.json({ body});
});
const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
