import { useCallback, useEffect, useState } from "react";
import projectApi from "../services/api";
import streaksApi from "@/features/streaks/services/api";

import type { Project as ProjectType, Id, Streak as StreakType } from "@/types";

export function useProjects() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streaks, setStreaks] = useState<StreakType[]>([]);
  const [habits, setProjects] = useState<ProjectType[]>([]);

  const isLoading = !!loading;
  const isError = !!error;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const projectPromise = projectApi.list();
      const streakPromise = streaksApi.list();
      const [habits, streaks] = await Promise.all([
        projectPromise,
        streakPromise,
      ]);
      setProjects(habits ?? []);
      setStreaks(streaks ?? []);
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
    streaks,
    projects,
    error,
  };
}

export default useProjects;