"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.RateLimitMaxRetriesError = exports.RateLimitError = void 0;
var tslib_1 = require("tslib");
var RateLimitError = /** @class */ (function (_super) {
    tslib_1.__extends(RateLimitError, _super);
    function RateLimitError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RateLimitError;
}(Error));
exports.RateLimitError = RateLimitError;
var RateLimitMaxRetriesError = /** @class */ (function (_super) {
    tslib_1.__extends(RateLimitMaxRetriesError, _super);
    function RateLimitMaxRetriesError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RateLimitMaxRetriesError;
}(Error));
exports.RateLimitMaxRetriesError = RateLimitMaxRetriesError;
var ApiError = /** @class */ (function (_super) {
    tslib_1.__extends(ApiError, _super);
    function ApiError(body, response) {
        var _this = _super.call(this, "[" + response.status + "] " + body.title + ": " + body.detail) || this;
        _this.body = body;
        _this.response = response;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
//# sourceMappingURL=errors.js.map