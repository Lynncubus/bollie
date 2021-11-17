import yargs from 'yargs';
import { Client } from '../src/v5/index';
import fetch from 'isomorphic-fetch';

yargs(process.argv.slice(2))
  .option('clientId', {
    alias: 'c',
    type: 'string',
  })
  .option('secret', { alias: 's', type: 'string' })
  .option('demo', { alias: 'd', type: 'boolean' })
  .options('query', {
    alias: 'q',
  })
  .demandOption(['clientId', 'secret'])
  .command(
    'get <path>',
    'get api request',
    () => {},
    async argv => {
      console.dir({ argv }, { depth: 10 });

      const client = new Client({
        clientId: argv.clientId,
        clientSecret: argv.secret,
      });
      const query = new URLSearchParams(
        Object.entries((argv.q as object) ?? {})
      );

      const url = `${client.getEndpoint(
        argv.demo
      )}/${(argv.path as string).replace(/^\//, '')}?${query.toString()}`;
      const options = await client.getFetchOptions();

      const response = await fetch(url, options);

      const result = await response.json();

      console.dir({ result, url, options }, { depth: 10 });
    }
  )
  .demandCommand()
  .parse();
