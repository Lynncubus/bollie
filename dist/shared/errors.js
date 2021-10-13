"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.RateLimitMaxRetriesError = exports.RateLimitError = void 0;
class RateLimitError extends Error {
}
exports.RateLimitError = RateLimitError;
class RateLimitMaxRetriesError extends Error {
}
exports.RateLimitMaxRetriesError = RateLimitMaxRetriesError;
class ApiError extends Error {
    constructor(body, response) {
        super(`[${response.status}] ${body.title}: ${body.detail}`);
        this.body = body;
        this.response = response;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=errors.js.map