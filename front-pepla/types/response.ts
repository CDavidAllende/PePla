export type ResponseType<T = any> = {
    result: T | null;
    loading: boolean;
    error?: string;
};