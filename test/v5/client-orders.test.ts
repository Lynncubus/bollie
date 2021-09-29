import { FileStorage } from '../../src/shared/storage';
import { Client } from '../../src/v5';

const storage = new FileStorage('./test/.tmp/v5');

describe('should be able to fetch orders', () => {
  const client = new Client({
    clientId: process.env.BOL_CLIENT_ID as string,
    clientSecret: process.env.BOL_CLIENT_SECRET as string,
    storage,
    demo: true,
  });

  test('with default options', async () => {
    const orders = await client.getOrders();

    expect(orders).toBeInstanceOf(Array);
    expect(orders).toMatchSnapshot();
  });

  // Not on demo mode, but we can test outside of demo mode, except i dont want
  // these in committed snapshots.

  // test('with different page', async () => {
  //   const client = new Client({
  //     clientId: process.env.BOL_CLIENT_ID as string,
  //     clientSecret: process.env.BOL_CLIENT_SECRET as string,
  //     storage,
  //     // demo:true,
  //   });
  //   const orders = await client.getOrders({ page: 2 });

  //   expect(orders).toBeInstanceOf(Array);
  //   expect(orders).toMatchSnapshot();
  // });

  test('with different fullfillment method', async () => {
    const orders = await client.getOrders({ fulfilmentMethod: 'FBB' });

    expect(orders).toBeInstanceOf(Array);
    expect(orders).toMatchSnapshot();
  });

  test('with different status', async () => {
    const orders = await client.getOrders({ status: 'ALL' });

    expect(orders).toBeInstanceOf(Array);
    expect(orders).toMatchSnapshot();
  });
});

describe('Should be able to get a single order', () => {
  const client = new Client({
    clientId: process.env.BOL_CLIENT_ID as string,
    clientSecret: process.env.BOL_CLIENT_SECRET as string,
    storage,
    demo: true,
  });

  test.each(['1043946570', '1042831430', 'A4K8290LP0', 'B3K8290LP0'])(
    'Demo order %s',
    async orderId => {
      const order = await client.getOrder(orderId);

      expect(order).toMatchSnapshot();
    }
  );
});
