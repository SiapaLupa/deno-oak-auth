
import { Database, MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const HOST = Deno.env.get("DATABASE_HOST")
const DATABASE = Deno.env.get("DATABASE_NAME")

const DB_URL = `mongodb://${HOST}/${DATABASE}`;
const client: MongoClient = new MongoClient();

await client.connect(DB_URL);

export const db: Database = client.database(DATABASE);