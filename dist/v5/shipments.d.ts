export declare enum TransporterCode {
    Briefpost = "BRIEFPOST",
    Ups = "UPS",
    Tnt = "TNT",
    TntEXTRA = "TNT-EXTRA",
    TntBrief = "TNT_BRIEF",
    TntExpress = "TNT-EXPRESS",
    Dyl = "DYL",
    DpdNL = "DPD-NL",
    DpdBE = "DPD-BE",
    BpostBe = "BPOST_BE",
    BpostBrief = "BPOST_BRIEF",
    Dhlforyou = "DHLFORYOU",
    Gls = "GLS",
    FedexNl = "FEDEX_NL",
    FedexBe = "FEDEX_BE",
    Other = "OTHER",
    Dhl = "DHL",
    DhlDe = "DHL_DE",
    DhlGlobalMail = "DHL-GLOBAL-MAIL",
    Tsn = "TSN",
    Fiege = "FIEGE",
    Transmission = "TRANSMISSION",
    ParcelNl = "PARCEL-NL",
    Logoix = "LOGOIX",
    Packs = "PACKS",
    Courier = "COURIER",
    Rjp = "RJP"
}
export declare type ApiPutShipmentBody = {
    orderItems: [{
        orderItemId: string;
    }];
    shipmentReference?: string;
} & ({
    shippingLabelId: string;
} | {
    transport: {
        trackAndTrace: string;
        transporterCode: TransporterCode;
    };
});
export declare const ShipmentBodySchema: import("superstruct").Struct<import("superstruct/lib/utils").AnyStruct | ({
    shippingLabelId: string;
} & import("superstruct/lib/utils").AnyStruct), null>;
