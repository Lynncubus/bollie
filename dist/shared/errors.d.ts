export declare class RateLimitError extends Error {
}
export declare class RateLimitMaxRetriesError extends Error {
}
export interface ApiErrorBody {
    type: string;
    title: string;
    status: number;
    detail: string;
    host: string;
    instance: string;
    violations: {
        name: string;
        reason: string;
    }[];
}
export declare class ApiError extends Error {
    readonly body: ApiErrorBody;
    readonly response: Response;
    constructor(body: ApiErrorBody, response: Response);
}
