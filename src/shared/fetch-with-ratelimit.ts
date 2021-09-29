import fetch from 'isomorphic-fetch';
import debug from 'debug';
import { RateLimitMaxRetriesError } from './errors';

const log = debug('bollie:fetch');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type RateLimitOptions = {
  maxRetries?: number;
  retryAfterDefault?: number;
};

export type RequestInitWithRateLimitOptions = {
  rateLimit?: RateLimitOptions;
} & RequestInit;

export const fetchWithRatelimit = async (
  input: RequestInfo,
  init: RequestInitWithRateLimitOptions
) => {
  const { maxRetries = 10, retryAfterDefault = 10 }: RateLimitOptions =
    init?.rateLimit ?? {};

  let attempted = 0;

  while (attempted <= maxRetries) {
    attempted += 1;

    log('Attempting to fetch %s, attempt %d', input, attempted);
    const response = await fetch(input, init);

    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfter =
        (retryAfterHeader
          ? parseInt(retryAfterHeader, 10)
          : retryAfterDefault) * 1000;

      log(
        'Got status 429 while fetching %s, retrying after %d seconds',
        input,
        retryAfter
      );

      await sleep(retryAfter);
    } else {
      return response;
    }
  }

  throw new RateLimitMaxRetriesError();
};
