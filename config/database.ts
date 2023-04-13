// config/database.ts file

import { Database, MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const HOST = "127.0.0.1:27017"; //this is default
const DATABASE = "test"; //your database name
const DB_URL = `mongodb://${HOST}/${DATABASE}`;
const client: MongoClient = new MongoClient();

await client.connect(DB_URL);

export const db: Database = client.database(DATABASE);