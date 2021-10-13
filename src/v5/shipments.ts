import {
  enums,
  intersection,
  object,
  optional,
  string,
  tuple,
  type,
  union,
} from 'superstruct';

export type ApiPutShipmentBody = {
  orderItems: [{ orderItemId: string }];
  shipmentReference?: string;
} & (
  | { shippingLabelId: string }
  | {
      transport: {
        trackAndTrace: string;
        transporterCode:
          | 'BRIEFPOST'
          | 'UPS'
          | 'TNT'
          | 'TNT-EXTRA'
          | 'TNT_BRIEF'
          | 'TNT-EXPRESS'
          | 'DYL'
          | 'DPD-NL'
          | 'DPD-BE'
          | 'BPOST_BE'
          | 'BPOST_BRIEF'
          | 'DHLFORYOU'
          | 'GLS'
          | 'FEDEX_NL'
          | 'FEDEX_BE'
          | 'OTHER'
          | 'DHL'
          | 'DHL_DE'
          | 'DHL-GLOBAL-MAIL'
          | 'TSN'
          | 'FIEGE'
          | 'TRANSMISSION'
          | 'PARCEL-NL'
          | 'LOGOIX'
          | 'PACKS'
          | 'COURIER'
          | 'RJP';
      };
    }
);

export const ShipmentBodySchema = intersection([
  union([
    type({
      shippingLabelId: string(),
    }),
    type({
      transport: object({
        trackAndTrace: string(),
        transporterCode: enums([
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
  type({
    orderItems: tuple([object({ orderItemId: string() })]),
    shipmentReference: optional(string()),
  }),
]);
