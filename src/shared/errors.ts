export class RateLimitError extends Error {}

export class RateLimitMaxRetriesError extends Error {}

export interface ApiErrorBody {
  type: string;
  title: string;
  status: number;
  detail: string;
  host: string;
  instance: string;
  violations: { name: string; reason: string }[];
}
export class ApiError extends Error {
  constructor(readonly body: ApiErrorBody, readonly response: Response) {
    super(`[${response.status}] ${body.title}: ${body.detail}`);
  }
}
