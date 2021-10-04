"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithRatelimit = void 0;
var tslib_1 = require("tslib");
var isomorphic_fetch_1 = tslib_1.__importDefault(require("isomorphic-fetch"));
var debug_1 = tslib_1.__importDefault(require("debug"));
var errors_1 = require("./errors");
var log = debug_1.default('bollie:fetch');
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.fetchWithRatelimit = function (input, init) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, _b, maxRetries, _c, retryAfterDefault, attempted, response, retryAfterHeader, retryAfter;
    var _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = (_d = init === null || init === void 0 ? void 0 : init.rateLimit) !== null && _d !== void 0 ? _d : {}, _b = _a.maxRetries, maxRetries = _b === void 0 ? 10 : _b, _c = _a.retryAfterDefault, retryAfterDefault = _c === void 0 ? 10 : _c;
                attempted = 0;
                _e.label = 1;
            case 1:
                if (!(attempted <= maxRetries)) return [3 /*break*/, 6];
                attempted += 1;
                log('Attempting to fetch %s, attempt %d', input, attempted);
                return [4 /*yield*/, isomorphic_fetch_1.default(input, init)];
            case 2:
                response = _e.sent();
                if (!(response.status === 429)) return [3 /*break*/, 4];
                retryAfterHeader = response.headers.get('Retry-After');
                retryAfter = (retryAfterHeader
                    ? parseInt(retryAfterHeader, 10)
                    : retryAfterDefault) * 1000;
                log('Got status 429 while fetching %s, retrying after %d seconds', input, retryAfter);
                return [4 /*yield*/, sleep(retryAfter)];
            case 3:
                _e.sent();
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, response];
            case 5: return [3 /*break*/, 1];
            case 6: throw new errors_1.RateLimitMaxRetriesError();
        }
    });
}); };
//# sourceMappingURL=fetch-with-ratelimit.js.map