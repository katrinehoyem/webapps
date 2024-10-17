import { Result } from "@/types";

type StudentRepository = {
    list: (query: Record<string, string>) => Promise<Result<string[]>>
};
export const createStudentRepository = () => {};