import { exec } from "child_process";
import path from "path";
import * as rabbitMq from "../../src/entity/rabbit-mq";

const RABBIT_MQ_IP =  "127.0.0.1" ;
const GET_PRODUCTS_QUEUE = "getAllProducts";

const app = exec( `node ${path.resolve( __dirname, "../../dist/app.js" )}` );
afterAll( () => app.kill( "SIGTERM" ) );

async function setup() {
  const rabbitMqConnection = new rabbitMq.Connection( RABBIT_MQ_IP );
  await rabbitMqConnection.open();
  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();
  return queue;
}

test( "success", async () => {
  const testQueue = await setup();
  const res: any = await testQueue.send( GET_PRODUCTS_QUEUE, {} );

  expect( res.error ).toBeFalsy();
} );
