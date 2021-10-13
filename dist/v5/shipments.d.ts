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
        transporterCode: 'BRIEFPOST' | 'UPS' | 'TNT' | 'TNT-EXTRA' | 'TNT_BRIEF' | 'TNT-EXPRESS' | 'DYL' | 'DPD-NL' | 'DPD-BE' | 'BPOST_BE' | 'BPOST_BRIEF' | 'DHLFORYOU' | 'GLS' | 'FEDEX_NL' | 'FEDEX_BE' | 'OTHER' | 'DHL' | 'DHL_DE' | 'DHL-GLOBAL-MAIL' | 'TSN' | 'FIEGE' | 'TRANSMISSION' | 'PARCEL-NL' | 'LOGOIX' | 'PACKS' | 'COURIER' | 'RJP';
    };
});
export declare const ShipmentBodySchema: import("superstruct").Struct<import("superstruct/lib/utils").AnyStruct | ({
    shippingLabelId: string;
} & import("superstruct/lib/utils").AnyStruct), null>;
