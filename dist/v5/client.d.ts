import { SetRequired } from 'type-fest';
import { IStorage } from '../shared/storage';
import { Token } from '../shared/types';
import { ApiGetOrdersQuery, ApiOrder, ApiReducedOrder } from './order';
import { ApiProcess } from './process';
import { ApiPutShipmentBody } from './shipments';
export interface ClientDemoOptions {
    getOrders?: boolean;
    getOrder?: boolean;
    shipOrderItem?: boolean;
}
export interface ClientOptions {
    clientId: string;
    clientSecret: string;
    tokenEndpoint?: string;
    apiEndpoint?: string;
    demo?: boolean | ClientDemoOptions;
    storage?: IStorage;
}
export declare class Client {
    readonly options: SetRequired<ClientOptions, 'tokenEndpoint' | 'apiEndpoint'> & {
        demo: ClientDemoOptions;
    };
    readonly storage: IStorage;
    constructor(options: ClientOptions);
    getEndpoint(demo?: boolean): string;
    getFetchOptions(): Promise<RequestInit>;
    getToken(force?: boolean): Promise<Token>;
    protected fetchToken(): Promise<Token>;
    getOrders(options?: ApiGetOrdersQuery): Promise<ApiReducedOrder[]>;
    getOrder(orderId: string): Promise<ApiOrder>;
    shipOrderItem(shipment: ApiPutShipmentBody): Promise<ApiProcess>;
    getProcessStatus(processStatusId: string): Promise<ApiProcess>;
}
