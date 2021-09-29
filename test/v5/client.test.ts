import { FileStorage } from '../../src/shared/storage';
import { Client } from '../../src/v5';

const storage = new FileStorage('./test/.tmp/v5');

test('should be able to create a client', () => {
  new Client({
    clientId: 'XXX',
    clientSecret: 'XXX',
    demo: true,
  });
});

test('should be able to fetch a token', async () => {
  const client = new Client({
    clientId: process.env.BOL_CLIENT_ID as string,
    clientSecret: process.env.BOL_CLIENT_SECRET as string,
    storage,
    demo: true,
  });

  expect(await client.getToken()).toBeDefined();
});
