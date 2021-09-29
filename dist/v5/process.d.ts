export interface ApiProcess {
    processStatusId: string;
    entityId: string;
    eventType: string;
    description: string;
    status: string;
    errorMessage: string;
    createTimestamp: string;
    links: [{
        rel: 'self';
        href: string;
        method: 'GET';
    }];
}
