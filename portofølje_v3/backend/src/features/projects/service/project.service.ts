import type { Result } from "@/types";
import {
  projectRepository,
  type projectRepository,
} from "./project.repository";

import {
  validateCreateproject,
  type Createproject,
  type Project,
  type ProjectResponse,
  type Ppdateproject,
} from "./project.schema";

import { createproject, createprojectResponse } from "./project.mapper";
import type { Query } from "@/lib/query";

export const createprojectService = (projectRepository: ProjectRepository) => {
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id);
  };

  const list = async (query?: Query): Promise<Result<ProjectResponse[]>> => {
    const result = await ProjectRepository.list(query);
    if (!result.success) return result;

    return {
      ...result,
      data: result.data.map(createprojectResponse),
    };
  };

  const create = async (data: Createproject): Promise<Result<string>> => {
    const project = createproject(data);

    if (!validateCreateproject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }
    return projectRepository.create(project);
  };

  const update = async (data: Updateproject) => {
    const project = createproject(data);

    if (!validateCreateproject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }

    return projectRepository.update(project);
  };

  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    remove,
  };
};

export const projectService = createprojectService(projectRepository);

export type projectService = ReturnType<typeof createprojectService>;