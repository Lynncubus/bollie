import { __assign, __awaiter, __generator } from "tslib";
import { MemoryStorage } from '../shared/storage';
import fetch from 'isomorphic-fetch';
import { fetchWithRatelimit } from '../shared/fetch-with-ratelimit';
import debug from 'debug';
import { ApiError } from '..';
var log = debug('bollie:client');
var Client = /** @class */ (function () {
    function Client(options) {
        var _a;
        log('Creating new client');
        this.options = __assign({ tokenEndpoint: 'https://login.bol.com', apiEndpoint: 'https://api.bol.com', demo: false }, options);
        this.storage = (_a = this.options.storage) !== null && _a !== void 0 ? _a : new MemoryStorage();
    }
    Object.defineProperty(Client.prototype, "endpoint", {
        get: function () {
            return (this.options.apiEndpoint +
                (this.options.demo ? '/retailer-demo' : '/retailer'));
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.getFetchOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    Accept: 'application/vnd.retailer.v5+json',
                                    'Content-Type': 'application/vnd.retailer.v5+json',
                                    Authorization: token.token_type + " " + token.access_token,
                                },
                            }];
                }
            });
        });
    };
    Client.prototype.getToken = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getToken()];
                    case 1:
                        token = _a.sent();
                        if (!(!token || (token && token.expires_at < Date.now()) || force)) return [3 /*break*/, 4];
                        log('Token expired or unavailable in storage. Fetching new token.');
                        return [4 /*yield*/, this.fetchToken()];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, this.storage.setToken(token)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, token];
                }
            });
        });
    };
    Client.prototype.fetchToken = function () {
        return fetch(this.options.tokenEndpoint + "/token?grant_type=client_credentials", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: "Basic " + Buffer.from(this.options.clientId + ":" + this.options.clientSecret).toString('base64'),
            },
        })
            .then(function (response) { return response.json(); })
            .then(function (token) {
            token.expires_at = Date.now() + token.expires_in * 1000;
            return token;
        });
    };
    Client.prototype.getOrders = function (options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query, response, _b, _c, _d, _e, body, orders;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        log('Getting orders');
                        query = new URLSearchParams();
                        if (typeof options.page === 'number') {
                            query.set('page', options.page.toString());
                        }
                        if (typeof options.fulfilmentMethod === 'string') {
                            query.set('fulfilment-method', options.fulfilmentMethod);
                        }
                        if (typeof options.status === 'string') {
                            query.set('status', options.status);
                        }
                        _b = fetchWithRatelimit;
                        _c = [this.endpoint + "/orders?" + query.toString()];
                        _d = [{}];
                        return [4 /*yield*/, this.getFetchOptions()];
                    case 1: return [4 /*yield*/, _b.apply(void 0, _c.concat([__assign.apply(void 0, _d.concat([(_f.sent())]))]))];
                    case 2:
                        response = _f.sent();
                        if (!(response.status !== 200)) return [3 /*break*/, 4];
                        _e = ApiError.bind;
                        return [4 /*yield*/, response.json()];
                    case 3: throw new (_e.apply(ApiError, [void 0, _f.sent(), response]))();
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        body = _f.sent();
                        orders = (_a = body.orders) !== null && _a !== void 0 ? _a : [];
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    Client.prototype.getOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        log('Getting order %s', orderId);
                        _a = fetchWithRatelimit;
                        _b = [this.endpoint + "/orders/" + orderId];
                        _c = [{}];
                        return [4 /*yield*/, this.getFetchOptions()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([__assign.apply(void 0, _c.concat([(_e.sent())]))]))];
                    case 2:
                        response = _e.sent();
                        if (!(response.status !== 200)) return [3 /*break*/, 4];
                        _d = ApiError.bind;
                        return [4 /*yield*/, response.json()];
                    case 3: throw new (_d.apply(ApiError, [void 0, _e.sent(), response]))();
                    case 4: return [4 /*yield*/, response.json()];
                    case 5: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    Client.prototype.shipOrderItem = function (shipment) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        log('Adding shipment for orderItemId %s', shipment.orderItems[0].orderItemId);
                        _a = fetchWithRatelimit;
                        _b = [this.endpoint + "/orders/shipment"];
                        _c = [{}];
                        return [4 /*yield*/, this.getFetchOptions()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([__assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_e.sent())])), { method: 'POST', body: JSON.stringify(shipment) }])]))];
                    case 2:
                        response = _e.sent();
                        if (!(response.status !== 200)) return [3 /*break*/, 4];
                        _d = ApiError.bind;
                        return [4 /*yield*/, response.json()];
                    case 3: throw new (_d.apply(ApiError, [void 0, _e.sent(), response]))();
                    case 4: return [4 /*yield*/, response.json()];
                    case 5: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=client.js.map