export interface ApiGetOrdersQuery {
    page?: number;
    fulfilmentMethod?: 'FBR' | 'FBB';
    status?: 'OPEN' | 'ALL';
}
export interface ApiReducedOrder {
    orderId: string;
    orderPlacedDateTime: string;
    orderItems: ApiReducedOrderItem[];
}
export interface ApiReducedOrderItem {
    orderItemId: string;
    ean: string;
    quantity: number;
    quantityShipped: number;
    quantityCancelled: number;
}
export interface ApiOrder extends ApiReducedOrder {
    pickupPoint: boolean;
    shipmentDetails: ApiOrderShipmentDetails;
    billingDetails: ApiOrderBillingDetails;
    orderItems: ApiOrderItem[];
}
export interface ApiOrderShipmentDetails {
    pickupPointName: string;
    salutation: 'MALE' | 'FEMALE' | 'UNKNOWN';
    firstName: string;
    surname: string;
    streetName: string;
    houseNumber: string;
    houseNumberExtension: string;
    extraAddressInformation: string;
    zipCode: string;
    city: string;
    countryCode: string;
    email: string;
    company: string;
    deliveryPhoneNumber: string;
    language: 'nl' | 'nl-BE' | 'fr' | 'fr-BE';
}
export interface ApiOrderBillingDetails extends ApiOrderShipmentDetails {
    vatNumber: string;
    kvkNumber: string;
    orderReference: string;
}
export interface ApiOrderItem extends ApiReducedOrderItem {
    cancellationRequest: boolean;
    fullfillment: ApiOrderItemFullfillment;
    offer: ApiOrderItemOffer;
    product: ApiOrderItemProduct;
    quantity: number;
    quantityShipped: number;
    quantityCancelled: number;
    unitPrice: number;
    commission: number;
    additionalServices: ApiOrderItemAddictionalService[];
}
export interface ApiOrderItemFullfillment {
    method: 'FBR' | 'FBB';
    distributionParty: 'RETAILER' | 'BOL';
    latestDeliveryDate: string;
    exactDeliveryDate: string;
    expiryDate: string;
    timeFrameType: 'REGULAR' | 'EVENING' | 'APPOINTMENT' | 'SAMEDAY' | 'SUNDAY';
}
export interface ApiOrderItemOffer {
    offerId: string;
    reference: string;
}
export interface ApiOrderItemProduct {
    ean: string;
    title: string;
}
export interface ApiOrderItemAddictionalService {
    serviceType: string;
}
