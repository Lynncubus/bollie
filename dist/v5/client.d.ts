import { IStorage } from '../shared/storage';
import { SetRequired } from 'type-fest';
import { Token } from '../shared/types';
import { ApiGetOrdersQuery, ApiOrder, ApiPutShipmentBody, ApiReducedOrder } from './order';
import { ApiProcess } from './process';
export interface ClientOptions {
    clientId: string;
    clientSecret: string;
    tokenEndpoint?: string;
    apiEndpoint?: string;
    demo?: boolean;
    storage?: IStorage;
}
export declare class Client {
    protected readonly options: SetRequired<ClientOptions, 'tokenEndpoint' | 'apiEndpoint'>;
    protected readonly storage: IStorage;
    constructor(options: ClientOptions);
    protected get endpoint(): string;
    getFetchOptions(): Promise<RequestInit>;
    getToken(force?: boolean): Promise<Token>;
    protected fetchToken(): Promise<Token>;
    getOrders(options?: ApiGetOrdersQuery): Promise<ApiReducedOrder[]>;
    getOrder(orderId: string): Promise<ApiOrder>;
    shipOrderItem(shipment: ApiPutShipmentBody): Promise<ApiProcess>;
}
