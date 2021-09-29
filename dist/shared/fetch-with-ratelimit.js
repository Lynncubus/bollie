import { __awaiter, __generator } from "tslib";
import fetch from 'isomorphic-fetch';
import debug from 'debug';
import { RateLimitMaxRetriesError } from './errors';
var log = debug('bollie:fetch');
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
export var fetchWithRatelimit = function (input, init) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, maxRetries, _c, retryAfterDefault, attempted, response, retryAfterHeader, retryAfter;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = (_d = init === null || init === void 0 ? void 0 : init.rateLimit) !== null && _d !== void 0 ? _d : {}, _b = _a.maxRetries, maxRetries = _b === void 0 ? 10 : _b, _c = _a.retryAfterDefault, retryAfterDefault = _c === void 0 ? 10 : _c;
                attempted = 0;
                _e.label = 1;
            case 1:
                if (!(attempted <= maxRetries)) return [3 /*break*/, 6];
                attempted += 1;
                log('Attempting to fetch %s, attempt %d', input, attempted);
                return [4 /*yield*/, fetch(input, init)];
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
            case 6: throw new RateLimitMaxRetriesError();
        }
    });
}); };
//# sourceMappingURL=fetch-with-ratelimit.js.map