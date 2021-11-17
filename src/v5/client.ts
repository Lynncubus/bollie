import debug from 'debug';
import fetch from 'isomorphic-fetch';
import { assert } from 'superstruct';
import { SetRequired } from 'type-fest';

import { ApiError } from '..';
import { fetchWithRatelimit } from '../shared/fetch-with-ratelimit';
import { IStorage, MemoryStorage } from '../shared/storage';
import { Token } from '../shared/types';
import { ApiGetOrdersQuery, ApiOrder, ApiReducedOrder } from './order';
import { ApiProcess } from './process';
import { ApiPutShipmentBody, ShipmentBodySchema } from './shipments';

const log = debug('bollie:client');

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

export class Client {
  readonly options: SetRequired<
    ClientOptions,
    'tokenEndpoint' | 'apiEndpoint'
  > & { demo: ClientDemoOptions };

  readonly storage: IStorage;

  constructor(options: ClientOptions) {
    log('Creating new client');

    this.options = Object.assign(
      {
        tokenEndpoint: 'https://login.bol.com',
        apiEndpoint: 'https://api.bol.com',
      },
      options,
      {
        demo:
          typeof options.demo === 'object'
            ? Object.assign(
                {
                  getOrders: false,
                  getOrder: false,
                  shipOrderItem: false,
                },
                options.demo
              )
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
      }
    );

    this.storage = this.options.storage ?? new MemoryStorage();
  }

  getEndpoint(demo: boolean = false) {
    return this.options.apiEndpoint + (demo ? '/retailer-demo' : '/retailer');
  }

  async getFetchOptions(): Promise<RequestInit> {
    const token = await this.getToken();

    return {
      headers: {
        Accept: 'application/vnd.retailer.v5+json',
        'Content-Type': 'application/vnd.retailer.v5+json',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
  }

  async getToken(force: boolean = false): Promise<Token> {
    let token = await this.storage.getToken();

    if (!token || (token && token.expires_at < Date.now()) || force) {
      log('Token expired or unavailable in storage. Fetching new token.');

      token = await this.fetchToken();

      await this.storage.setToken(token);
    }

    return token;
  }

  protected fetchToken(): Promise<Token> {
    return fetch(
      `${this.options.tokenEndpoint}/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${this.options.clientId}:${this.options.clientSecret}`
          ).toString('base64')}`,
        },
      }
    )
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

  async getOrders(options: ApiGetOrdersQuery = {}): Promise<ApiReducedOrder[]> {
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

    const response = await fetchWithRatelimit(
      `${this.getEndpoint(
        this.options.demo.getOrders
      )}/orders?${query.toString()}`,
      await this.getFetchOptions()
    );

    if (response.status !== 200) {
      throw new ApiError(await response.json(), response);
    }

    const body = await response.json();

    const orders: ApiReducedOrder[] = body.orders ?? [];

    return orders;
  }

  async getOrder(orderId: string): Promise<ApiOrder> {
    log('Getting order %s', orderId);

    const response = await fetchWithRatelimit(
      `${this.getEndpoint(this.options.demo.getOrder)}/orders/${orderId}`,
      {
        ...(await this.getFetchOptions()),
      }
    );

    if (response.status !== 200) {
      throw new ApiError(await response.json(), response);
    }

    return await response.json();
  }

  async shipOrderItem(shipment: ApiPutShipmentBody): Promise<ApiProcess> {
    assert(shipment, ShipmentBodySchema);

    log(
      'Adding shipment for orderItemId %s',
      shipment.orderItems[0].orderItemId
    );

    if (this.options.demo.shipOrderItem) {
      return {
        processStatusId: '1234567',
        entityId: '987654321',
        eventType: 'CONFIRM_SHIPMENT',
        description:
          'Example process status description for processing 987654321.',
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
    } else {
      let response: Response;
      response = await fetchWithRatelimit(
        `${this.getEndpoint(this.options.demo.shipOrderItem)}/orders/shipment`,
        {
          ...(await this.getFetchOptions()),
          method: 'PUT',
          body: JSON.stringify(shipment),
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new ApiError(await response.json(), response);
      }

      return await response.json();
    }
  }
}
