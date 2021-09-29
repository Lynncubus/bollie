import { __awaiter, __generator } from "tslib";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync } from 'fs';
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
    }
    MemoryStorage.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.token];
            });
        });
    };
    MemoryStorage.prototype.setToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.token = token;
                return [2 /*return*/];
            });
        });
    };
    return MemoryStorage;
}());
export { MemoryStorage };
var FileStorage = /** @class */ (function () {
    function FileStorage(path) {
        this.path = path;
        mkdirSync(this.path, { recursive: true });
    }
    FileStorage.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, readFile(path.join(this.path, 'token.json'), 'utf-8')];
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, writeFile(path.join(this.path, 'token.json'), JSON.stringify(token), 'utf-8')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileStorage;
}());
export { FileStorage };
//# sourceMappingURL=storage.js.map