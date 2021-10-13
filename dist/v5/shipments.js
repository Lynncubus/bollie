"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentBodySchema = void 0;
var superstruct_1 = require("superstruct");
exports.ShipmentBodySchema = superstruct_1.intersection([
    superstruct_1.union([
        superstruct_1.type({
            shippingLabelId: superstruct_1.string(),
        }),
        superstruct_1.type({
            transport: superstruct_1.object({
                trackAndTrace: superstruct_1.string(),
                transporterCode: superstruct_1.enums([
                    'BRIEFPOST',
                    'UPS',
                    'TNT',
                    'TNT-EXTRA',
                    'TNT_BRIEF',
                    'TNT-EXPRESS',
                    'DYL',
                    'DPD-NL',
                    'DPD-BE',
                    'BPOST_BE',
                    'BPOST_BRIEF',
                    'DHLFORYOU',
                    'GLS',
                    'FEDEX_NL',
                    'FEDEX_BE',
                    'OTHER',
                    'DHL',
                    'DHL_DE',
                    'DHL-GLOBAL-MAIL',
                    'TSN',
                    'FIEGE',
                    'TRANSMISSION',
                    'PARCEL-NL',
                    'LOGOIX',
                    'PACKS',
                    'COURIER',
                    'RJP',
                ]),
            }),
        }),
    ]),
    superstruct_1.type({
        orderItems: superstruct_1.tuple([superstruct_1.object({ orderItemId: superstruct_1.string() })]),
        shipmentReference: superstruct_1.optional(superstruct_1.string()),
    }),
]);
//# sourceMappingURL=shipments.js.map