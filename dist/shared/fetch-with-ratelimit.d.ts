export declare type RateLimitOptions = {
    maxRetries?: number;
    retryAfterDefault?: number;
};
export declare type RequestInitWithRateLimitOptions = {
    rateLimit?: RateLimitOptions;
} & RequestInit;
export declare const fetchWithRatelimit: (input: RequestInfo, init: RequestInitWithRateLimitOptions) => Promise<Response>;
