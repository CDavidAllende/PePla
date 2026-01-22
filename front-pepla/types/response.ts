import { CategoryType } from "./category";

export type ResponseType<T> = {
    result: T | null;
    loading: boolean;
    error?: string;
};

