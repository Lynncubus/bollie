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

export enum TransporterCode {
  Briefpost = 'BRIEFPOST',
  Ups = 'UPS',
  Tnt = 'TNT',
  TntEXTRA = 'TNT-EXTRA',
  TntBrief = 'TNT_BRIEF',
  TntExpress = 'TNT-EXPRESS',
  Dyl = 'DYL',
  DpdNL = 'DPD-NL',
  DpdBE = 'DPD-BE',
  BpostBe = 'BPOST_BE',
  BpostBrief = 'BPOST_BRIEF',
  Dhlforyou = 'DHLFORYOU',
  Gls = 'GLS',
  FedexNl = 'FEDEX_NL',
  FedexBe = 'FEDEX_BE',
  Other = 'OTHER',
  Dhl = 'DHL',
  DhlDe = 'DHL_DE',
  DhlGlobalMail = 'DHL-GLOBAL-MAIL',
  Tsn = 'TSN',
  Fiege = 'FIEGE',
  Transmission = 'TRANSMISSION',
  ParcelNl = 'PARCEL-NL',
  Logoix = 'LOGOIX',
  Packs = 'PACKS',
  Courier = 'COURIER',
  Rjp = 'RJP',
}

export type ApiPutShipmentBody = {
  orderItems: [{ orderItemId: string }];
  shipmentReference?: string;
} & (
  | { shippingLabelId: string }
  | {
      transport: {
        trackAndTrace: string;
        transporterCode: TransporterCode;
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
        transporterCode: enums(Object.values(TransporterCode)),
      }),
    }),
  ]),
  type({
    orderItems: tuple([object({ orderItemId: string() })]),
    shipmentReference: optional(string()),
  }),
]);
