import { __extends } from "tslib";
var RateLimitError = /** @class */ (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RateLimitError;
}(Error));
export { RateLimitError };
var RateLimitMaxRetriesError = /** @class */ (function (_super) {
    __extends(RateLimitMaxRetriesError, _super);
    function RateLimitMaxRetriesError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RateLimitMaxRetriesError;
}(Error));
export { RateLimitMaxRetriesError };
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(body, response) {
        var _this = _super.call(this, "[" + response.status + "] " + body.title + ": " + body.detail) || this;
        _this.body = body;
        _this.response = response;
        return _this;
    }
    return ApiError;
}(Error));
export { ApiError };
//# sourceMappingURL=errors.js.map