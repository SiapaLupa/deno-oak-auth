
import { Context, Middleware } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { UserCollection } from "../models/user.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { SessionCollection } from "../models/session.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

export { signin, signout, signup };

const signup: Middleware = async (context: Context) => {
  const { request, response, cookies } = context;
  const body: URLSearchParams = await request.body({ type: "form" }).value;
  const { name, email, password } = Object.fromEntries(body);
  const _id: unknown = await UserCollection.insertOne({
    name: name.trim(),
    email,
    password: await bcrypt.hash(password),
  });
  const sessionId = await SessionCollection.insertOne({
    value: "user=" + _id!.toString(),
  });
  cookies.set("sessionId", (<ObjectId> sessionId).toString(), {
    signed: true,
  });
  response.body = { message: "Success SignUp" };
};

// controllers/auth.ts file

const signin: Middleware = async (context: Context) => {
    const { request, response, cookies } = context;
    const body: URLSearchParams = await request.body({ type: "form" }).value;
    const { email, password } = Object.fromEntries(body);
    if (!email) throw new Error("Email Field Required");
    const user = await UserCollection.findOne({ email });
    if (!user) throw new Error("User Not Found");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Wrong Password");
    const sessionId = await SessionCollection.insertOne({
      value: "user=" + user._id!.toString(),
    });
    cookies.set("sessionId", (<ObjectId> sessionId).toString(), {
      signed: true,
    });
    response.body = { message: "Success SignIn" };
  };

  // controllers/auth.ts file

const signout: Middleware = async (context: Context) => {
    const { response, cookies } = context;
    const sessionId = await cookies.get("sessionId", { signed: true });
    await cookies.delete("sessionId", { signed: true });
    if (!sessionId) throw new Error("You have been logout");
    await SessionCollection.deleteOne({ _id: new ObjectId(sessionId) });
    response.body = { message: "Success Logout" };
  };