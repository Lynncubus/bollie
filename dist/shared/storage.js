"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = exports.MemoryStorage = void 0;
var tslib_1 = require("tslib");
var fs_extra_1 = require("fs-extra");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = require("fs");
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
    }
    MemoryStorage.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.token];
            });
        });
    };
    MemoryStorage.prototype.setToken = function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.token = token;
                return [2 /*return*/];
            });
        });
    };
    return MemoryStorage;
}());
exports.MemoryStorage = MemoryStorage;
var FileStorage = /** @class */ (function () {
    function FileStorage(path) {
        this.path = path;
        fs_1.mkdirSync(this.path, { recursive: true });
    }
    FileStorage.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_extra_1.readFile(path_1.default.join(this.path, 'token.json'), 'utf-8')];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, JSON.parse(token)];
                    case 2:
                        err_1 = _a.sent();
                        // @ts-ignore
                        if (err_1.code === 'ENOENT') {
                            return [2 /*return*/, undefined];
                        }
                        console.dir(err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileStorage.prototype.setToken = function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.writeFile(path_1.default.join(this.path, 'token.json'), JSON.stringify(token), 'utf-8')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileStorage;
}());
exports.FileStorage = FileStorage;
//# sourceMappingURL=storage.js.map