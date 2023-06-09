import "https://deno.land/std@0.183.0/dotenv/load.ts"
import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { signin, signup,signout } from "./controllers/auth.ts";

const app: Application = new Application({
  keys: [Deno.env.get("COOKIE_SECRET") || "my-super-secret-key"],
});

const authRouter = new Router();
authRouter
  .post("/signin", signin)
  .post("/signup", signup)
  .post("/signout", signout)

app.use(authRouter.routes());

app.listen({ port: 3000 });