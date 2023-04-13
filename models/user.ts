
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { db } from "../config/database.ts";

export interface UserSchema {
  _id?: ObjectId;
  name: string;
  password: string;
  email: string;
}

export const UserCollection = db.collection<UserSchema>("User");