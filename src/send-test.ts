import * as rabbitMq from "./entity/rabbit-mq";

( async () => {
  const rabbitMqConnection = new rabbitMq.Connection( "127.0.0.1" );
  await rabbitMqConnection.open();
  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();

  let req: any = {
    storeLocationId: "61e961ba36fb8b6706b20374",
    productId      : "61e961ba36fb8b6706b20373",
  };
  req = { storeLocationId: "61e961ba36fb8b6706b20375" };

  const r = await queue.send( "getStoreLocation", req );
  console.log( r );
  process.exit( 0 );
} )();
