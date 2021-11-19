export enum ApiProcessStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Timeout = 'TIMEOUT',
}

export interface ApiProcess {
  processStatusId: string;
  entityId: string;
  eventType: string;
  description: string;
  status: ApiProcessStatus;
  errorMessage: string;
  createTimestamp: string;
  links: [
    {
      rel: 'self';
      href: string;
      method: 'GET';
    }
  ];
}
