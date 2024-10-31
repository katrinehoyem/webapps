import { useCallback, useEffect, useState } from "react";
import projectApi from "../services/api";

import type { Project as ProjectType, Id, } from "@/types";

export function useProjects() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const isLoading = !!loading;
  const isError = !!error;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const projectPromise = projectApi.list();
      const [project] = await Promise.all([
        projectPromise,
      ]);
      setProjects(project ?? []);
    } catch (error) {
      setError("Feilet ved henting av data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const add = async (data: Partial<ProjectType>) => {
    const { title = "" } = data;

    try {
      setLoading(true);
      await projectApi.create({ title });
    } catch (error) {
      setError("Failed creating habit");
    } finally {
      setLoading(false);
      await fetchData();
    }
  };

  const remove = async (id?: Id) => {
    if (!id) return;

    try {
      setLoading(true);
      await projectApi.remove(id);
    } catch (error) {
      setError("Failed removing item");
    } finally {
      setLoading(false);
      await fetchData();
    }
  };

  return {
    add,
    remove,
    get: fetchData,
    isLoading,
    isError,
    projects,
    error,
  };
}

export default useProjects;