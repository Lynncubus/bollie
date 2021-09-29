import { IStorage, MemoryStorage } from '../shared/storage';
import { SetRequired } from 'type-fest';
import fetch from 'isomorphic-fetch';
import { Token } from '../shared/types';
import { ApiGetOrdersQuery, ApiOrder, ApiReducedOrder } from './order';
import { fetchWithRatelimit } from '../shared/fetch-with-ratelimit';
import debug from 'debug';

const log = debug('bollie:client');

export interface ClientOptions {
  clientId: string;
  clientSecret: string;

  tokenEndpoint?: string;
  apiEndpoint?: string;
  demo?: boolean;

  storage?: IStorage;
}

export class Client {
  protected readonly options: SetRequired<
    ClientOptions,
    'tokenEndpoint' | 'apiEndpoint'
  >;

  protected readonly storage: IStorage;

  constructor(options: ClientOptions) {
    log('Creating new client');
    this.options = {
      tokenEndpoint: 'https://login.bol.com',
      apiEndpoint: 'https://api.bol.com',
      demo: false,
      ...options,
    };

    this.storage = this.options.storage ?? new MemoryStorage();
  }

  protected get endpoint() {
    return (
      this.options.apiEndpoint +
      (this.options.demo ? '/retailer-demo' : '/retailer')
    );
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
      `${this.endpoint}/orders?${query.toString()}`,
      {
        ...(await this.getFetchOptions()),
      }
    );

    const body = await response.json();

    const orders: ApiReducedOrder[] = body.orders ?? [];

    return orders;
  }

  async getOrder(orderId: string): Promise<ApiOrder> {
    log('Getting order %s', orderId);

    const response = await fetchWithRatelimit(
      `${this.endpoint}/orders/${orderId}`,
      {
        ...(await this.getFetchOptions()),
      }
    );

    return await response.json();
  }
}
