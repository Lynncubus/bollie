"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const isomorphic_fetch_1 = tslib_1.__importDefault(require("isomorphic-fetch"));
const superstruct_1 = require("superstruct");
const __1 = require("..");
const fetch_with_ratelimit_1 = require("../shared/fetch-with-ratelimit");
const storage_1 = require("../shared/storage");
const shipments_1 = require("./shipments");
const log = debug_1.default('bollie:client');
class Client {
    constructor(options) {
        var _a;
        log('Creating new client');
        this.options = Object.assign({
            tokenEndpoint: 'https://login.bol.com',
            apiEndpoint: 'https://api.bol.com',
        }, options, {
            demo: typeof options.demo === 'object'
                ? Object.assign({
                    getOrders: false,
                    getOrder: false,
                    shipOrderItem: false,
                }, options.demo)
                : options.demo === true
                    ? {
                        getOrders: true,
                        getOrder: true,
                        shipOrderItem: true,
                    }
                    : {
                        getOrders: false,
                        getOrder: false,
                        shipOrderItem: false,
                    },
        });
        this.storage = (_a = this.options.storage) !== null && _a !== void 0 ? _a : new storage_1.MemoryStorage();
    }
    getEndpoint(demo = false) {
        return this.options.apiEndpoint + (demo ? '/retailer-demo' : '/retailer');
    }
    getFetchOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield this.getToken();
            return {
                headers: {
                    Accept: 'application/vnd.retailer.v5+json',
                    'Content-Type': 'application/vnd.retailer.v5+json',
                    Authorization: `${token.token_type} ${token.access_token}`,
                },
            };
        });
    }
    getToken(force = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let token = yield this.storage.getToken();
            if (!token || (token && token.expires_at < Date.now()) || force) {
                log('Token expired or unavailable in storage. Fetching new token.');
                token = yield this.fetchToken();
                yield this.storage.setToken(token);
            }
            return token;
        });
    }
    fetchToken() {
        return isomorphic_fetch_1.default(`${this.options.tokenEndpoint}/token?grant_type=client_credentials`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`).toString('base64')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
            if (data.error) {
                throw new Error(`${data.error}: ${data.error_description}`);
            }
            return data;
        })
            .then(token => {
            token.expires_at = Date.now() + token.expires_in * 1000;
            return token;
        });
    }
    getOrders(options = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            log('Getting orders');
            const query = new URLSearchParams();
            if (typeof options.page === 'number') {
                query.set('page', options.page.toString());
            }
            if (typeof options.fulfilmentMethod === 'string') {
                query.set('fulfilment-method', options.fulfilmentMethod);
            }
            if (typeof options.status === 'string') {
                query.set('status', options.status);
            }
            const response = yield fetch_with_ratelimit_1.fetchWithRatelimit(`${this.getEndpoint(this.options.demo.getOrders)}/orders?${query.toString()}`, yield this.getFetchOptions());
            if (response.status !== 200) {
                throw new __1.ApiError(yield response.json(), response);
            }
            const body = yield response.json();
            const orders = (_a = body.orders) !== null && _a !== void 0 ? _a : [];
            return orders;
        });
    }
    getOrder(orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            log('Getting order %s', orderId);
            const response = yield fetch_with_ratelimit_1.fetchWithRatelimit(`${this.getEndpoint(this.options.demo.getOrder)}/orders/${orderId}`, Object.assign({}, (yield this.getFetchOptions())));
            if (response.status !== 200) {
                throw new __1.ApiError(yield response.json(), response);
            }
            return yield response.json();
        });
    }
    shipOrderItem(shipment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            superstruct_1.assert(shipment, shipments_1.ShipmentBodySchema);
            log('Adding shipment for orderItemId %s', shipment.orderItems[0].orderItemId);
            if (this.options.demo.shipOrderItem) {
                return {
                    processStatusId: '1234567',
                    entityId: '987654321',
                    eventType: 'CONFIRM_SHIPMENT',
                    description: 'Example process status description for processing 987654321.',
                    status: 'SUCCESS',
                    errorMessage: 'Example process status error message.',
                    createTimestamp: '2018-11-14T09:34:41+01:00',
                    links: [
                        {
                            rel: 'self',
                            href: 'https://api.bol.com/retailer/process-status/1234567',
                            method: 'GET',
                        },
                    ],
                };
            }
            else {
                let response;
                response = yield fetch_with_ratelimit_1.fetchWithRatelimit(`${this.getEndpoint(this.options.demo.shipOrderItem)}/orders/shipment`, Object.assign(Object.assign({}, (yield this.getFetchOptions())), { method: 'PUT', body: JSON.stringify(shipment) }));
                if (response.status < 200 || response.status >= 300) {
                    throw new __1.ApiError(yield response.json(), response);
                }
                return yield response.json();
            }
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map