import * as rabbitMq from "./entity/rabbit-mq";
import { MongoDB } from "./entity/mongodb";
import { ProductSchema, StoreLocationSchema } from "./schema";
import { ProductRepository, StoreLocationRepository } from "./repository";
import {
  getAllProductsController, getProductController,
  getAllStoreLocationsController, getStoreLocationController
} from "./controller";

const RABBIT_MQ_IP =  "127.0.0.1" ;
const GET_PRODUCTS_QUEUE = "getAllProducts";
const GET_PRODUCT_QUEUE = "getProduct";
const GET_LOCATIONS_QUEUE = "getAllStoreLocations";
const GET_LOCATION_QUEUE = "getStoreLocation";
const MONGO_URI = "mongodb://127.0.0.1:27017/product";

( async () => {
  const mongoDB = await MongoDB.create( MONGO_URI );
  mongoDB.addModel( "Product", ProductSchema );
  mongoDB.addModel( "StoreLocation", StoreLocationSchema );
  const productRepository = new ProductRepository( mongoDB.models.Product );
  const storeLocationRepository = new StoreLocationRepository( mongoDB.models.StoreLocation );

  const rabbitMqConnection = new rabbitMq.Connection( RABBIT_MQ_IP );
  await rabbitMqConnection.open();

  const getAllProductsQueue = new rabbitMq.Queue( rabbitMqConnection );
  const getProductQueue = new rabbitMq.Queue( rabbitMqConnection );
  const getAllStoreLocationsQueue = new rabbitMq.Queue( rabbitMqConnection );
  const getStoreLocationQueue = new rabbitMq.Queue( rabbitMqConnection );
  await Promise.all( [
    getAllProductsQueue.create(),
    getProductQueue.create(),
    getAllStoreLocationsQueue.create(),
    getStoreLocationQueue.create(),
  ] );

  getAllProductsQueue.setController( getAllProductsController( productRepository ) );
  getAllProductsQueue.listen( GET_PRODUCTS_QUEUE );

  getProductQueue.setController( getProductController( productRepository ) );
  getProductQueue.listen( GET_PRODUCT_QUEUE );

  getAllStoreLocationsQueue.setController( getAllStoreLocationsController( storeLocationRepository ) );
  getAllStoreLocationsQueue.listen( GET_LOCATIONS_QUEUE );

  getStoreLocationQueue.setController( getStoreLocationController( storeLocationRepository ) );
  getStoreLocationQueue.listen( GET_LOCATION_QUEUE );
} )();
