"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentBodySchema = exports.TransporterCode = void 0;
var superstruct_1 = require("superstruct");
var TransporterCode;
(function (TransporterCode) {
    TransporterCode["Briefpost"] = "BRIEFPOST";
    TransporterCode["Ups"] = "UPS";
    TransporterCode["Tnt"] = "TNT";
    TransporterCode["TntEXTRA"] = "TNT-EXTRA";
    TransporterCode["TntBrief"] = "TNT_BRIEF";
    TransporterCode["TntExpress"] = "TNT-EXPRESS";
    TransporterCode["Dyl"] = "DYL";
    TransporterCode["DpdNL"] = "DPD-NL";
    TransporterCode["DpdBE"] = "DPD-BE";
    TransporterCode["BpostBe"] = "BPOST_BE";
    TransporterCode["BpostBrief"] = "BPOST_BRIEF";
    TransporterCode["Dhlforyou"] = "DHLFORYOU";
    TransporterCode["Gls"] = "GLS";
    TransporterCode["FedexNl"] = "FEDEX_NL";
    TransporterCode["FedexBe"] = "FEDEX_BE";
    TransporterCode["Other"] = "OTHER";
    TransporterCode["Dhl"] = "DHL";
    TransporterCode["DhlDe"] = "DHL_DE";
    TransporterCode["DhlGlobalMail"] = "DHL-GLOBAL-MAIL";
    TransporterCode["Tsn"] = "TSN";
    TransporterCode["Fiege"] = "FIEGE";
    TransporterCode["Transmission"] = "TRANSMISSION";
    TransporterCode["ParcelNl"] = "PARCEL-NL";
    TransporterCode["Logoix"] = "LOGOIX";
    TransporterCode["Packs"] = "PACKS";
    TransporterCode["Courier"] = "COURIER";
    TransporterCode["Rjp"] = "RJP";
})(TransporterCode = exports.TransporterCode || (exports.TransporterCode = {}));
exports.ShipmentBodySchema = superstruct_1.intersection([
    superstruct_1.union([
        superstruct_1.type({
            shippingLabelId: superstruct_1.string(),
        }),
        superstruct_1.type({
            transport: superstruct_1.object({
                trackAndTrace: superstruct_1.string(),
                transporterCode: superstruct_1.enums(Object.values(TransporterCode)),
            }),
        }),
    ]),
    superstruct_1.type({
        orderItems: superstruct_1.tuple([superstruct_1.object({ orderItemId: superstruct_1.string() })]),
        shipmentReference: superstruct_1.optional(superstruct_1.string()),
    }),
]);
//# sourceMappingURL=shipments.js.map