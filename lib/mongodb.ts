import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const option = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> = global._mongoClientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add Mongo URI to .env.local");
}

if (!!uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, option);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, option);
    clientPromise = client.connect();
  }
}

export default clientPromise;
