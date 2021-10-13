"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithRatelimit = void 0;
const tslib_1 = require("tslib");
const isomorphic_fetch_1 = tslib_1.__importDefault(require("isomorphic-fetch"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const errors_1 = require("./errors");
const log = debug_1.default('bollie:fetch');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.fetchWithRatelimit = (input, init) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { maxRetries = 10, retryAfterDefault = 10 } = (_a = init === null || init === void 0 ? void 0 : init.rateLimit) !== null && _a !== void 0 ? _a : {};
    let attempted = 0;
    while (attempted <= maxRetries) {
        attempted += 1;
        log('Attempting to fetch %s, attempt %d', input, attempted);
        const response = yield isomorphic_fetch_1.default(input, init);
        if (response.status === 429) {
            const retryAfterHeader = response.headers.get('Retry-After');
            const retryAfter = (retryAfterHeader
                ? parseInt(retryAfterHeader, 10)
                : retryAfterDefault) * 1000;
            log('Got status 429 while fetching %s, retrying after %d seconds', input, retryAfter);
            yield sleep(retryAfter);
        }
        else {
            return response;
        }
    }
    throw new errors_1.RateLimitMaxRetriesError();
});
//# sourceMappingURL=fetch-with-ratelimit.js.map