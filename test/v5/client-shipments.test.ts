import { StructError } from 'superstruct';
import { FileStorage } from '../../src';
import { Client } from '../../src/v5';
import { TransporterCode } from '../../src/v5/shipments';

const storage = new FileStorage('./test/.tmp/v5');

describe('should be able to send shipments', () => {
  const client = new Client({
    clientId: process.env.BOL_CLIENT_ID as string,
    clientSecret: process.env.BOL_CLIENT_SECRET as string,
    storage,
    demo: true,
  });

  test('it should validate body at least and throw', async () => {
    expect(
      // @ts-ignore
      client.shipOrderItem({
        orderItems: [{ orderItemId: '1234567' }],
      })
    ).rejects.toThrow(StructError);
  });

  test('it should validate body at least 1', async () => {
    const result = await client.shipOrderItem({
      orderItems: [{ orderItemId: '1234567' }],
      shippingLabelId: '1234567',
    });

    expect(result).toStrictEqual({
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
    });
  });
  test('it should validate body at least 2', async () => {
    const result = await client.shipOrderItem({
      orderItems: [{ orderItemId: '1234567' }],
      transport: {
        trackAndTrace: '12345',
        transporterCode: TransporterCode.BpostBe,
      },
    });

    expect(result).toStrictEqual({
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
    });
  });
});
