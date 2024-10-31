import type { Result } from "../../../types/index";
import {
  projectRepository} from "../repository/project.respository";
import {
  valdateCreateproject,
  type ProjectResponse,
  type Project,
  type UpdateProject,
} from "../types/project.schema";

import { createproject } from "../mappers/project.mapper";
import type { Query } from "../../../lib/query";
import { CreateProject } from "../types/project.schema";

export const createprojectService = (projectRepository: projectRepository) => {
  const getBytitle = async (title: string): Promise<Result<Project | undefined>> => {
    return projectRepository.getBytitle(title);
  };



  const create = async (data: CreateProject): Promise<Result<string>> => {
    const project = createproject(data);

    if (!valdateCreateproject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }
    return projectRepository.create(project);
  };
  
  const list = async (query?: Query): Promise<Result<ProjectResponse[]>> => {
    const result = await projectRepository.list(query);
    if (!result.success) return result;

    return {
      ...result,
      data: result.data.map(createprojectResponse),
    };
  };

  const update = async (data: UpdateProject) => {
    const project = createproject(data);

    if (!valdateCreateproject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }

    return projectRepository.update(project);
  };

  const remove = async (title: string) => {
    return projectRepository.remove(title);
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

function createprojectResponse(value: { title: string; repoLink: string; description: string; publishedAt: string; tags: string; }, index: number, array: { title: string; repoLink: string; description: string; publishedAt: string; tags: string; }[]) {
  throw new Error("Function not implemented.");
}
