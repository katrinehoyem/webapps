import { Hono } from "hono";
import { createprojectService, projectService  } from "../service/project.service";
import { errorResponse, type ErrorCode } from "../././../../lib/error";
import { validateQuery } from "../../../lib/query";
import { title } from "process";

export const createProjectController = (ProjectService: projectService) => {
  const app = new Hono();

  app.get("/", async (c) => {
    const query = validateQuery(c.req.query()).data ?? {};

    const result = await ProjectService.list(query);

    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const title = c.req.param("title");
    const result = await createprojectService.getBytitle(title);

    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await ProjectService.create(data);
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result, { status: 201 });
  });

  app.patch("/:id", async (c) => {
    const id = c.req.param("title");
    const data = await c.req.json();

    const result = await ProjectService.update({ id, ...data });
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.delete("/:id", async (c) => {
    const id = c.req.param("title");
    const result = await ProjectService.remove(title);
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  return app;
};

export const ProjectController = createProjectController(projectService);