import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono()

app.use("/*", cors());

app.use("/statics/*", serveStatic({root: "./"}));

app.get('/json', async (c) => {
    return c.json({})
});

const port = 3999;

console.log("Server is running, fuck ye")

serve({
    fetch: app.fetch,
    port,
});