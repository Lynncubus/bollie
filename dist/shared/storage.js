"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = exports.MemoryStorage = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
class MemoryStorage {
    getToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.token;
        });
    }
    setToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.token = token;
        });
    }
}
exports.MemoryStorage = MemoryStorage;
class FileStorage {
    constructor(path) {
        this.path = path;
        fs_1.mkdirSync(this.path, { recursive: true });
    }
    getToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield fs_extra_1.readFile(path_1.default.join(this.path, 'token.json'), 'utf-8');
                return JSON.parse(token);
            }
            catch (err) {
                // @ts-ignore
                if (err.code === 'ENOENT') {
                    return undefined;
                }
                console.dir(err);
                throw err;
            }
        });
    }
    setToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield fs_extra_1.writeFile(path_1.default.join(this.path, 'token.json'), JSON.stringify(token), 'utf-8');
        });
    }
}
exports.FileStorage = FileStorage;
//# sourceMappingURL=storage.js.map