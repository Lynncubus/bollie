// Testing? None of these actually work in a demo environment, so good fucking
// luck.

// import { ApiPutShipmentBody, TransporterCode } from '../../src/v5/order';
// import { FileStorage } from '../../src/shared/storage';
// import { Client } from '../../src/v5';

// const storage = new FileStorage('./test/.tmp/v5');

// describe('Should be able to post shipments', () => {
//   const client = new Client({
//     clientId: process.env.BOL_CLIENT_ID as string,
//     clientSecret: process.env.BOL_CLIENT_SECRET as string,
//     storage,
//     demo: true,
//   });

//   test.each<ApiPutShipmentBody[]>([
//     [
//       {
//         orderItems: [{ orderItemId: '6107331382' }],
//         transport: {
//           transporterCode: TransporterCode.Dhl,
//           trackAndTrace: 'XXX',
//         },
//       },
//       {
//         orderItems: [{ orderItemId: '6107331383' }],
//       },
//     ],
//   ])('Demo order item id $orderItems.0.orderItemId', async shipment => {
//     const process = await client.shipOrderItem(shipment);

//     expect(process).toBeDefined();
//   });
// });
