import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { signin, signup,signout } from "./controllers/auth.ts";

const app: Application = new Application({
  keys: ["any-secret-key"],
});

const authRouter = new Router();
authRouter
  .post("/signin", signin)
  .post("/signup", signup)
  .post("/signout", signout)

app.use(authRouter.routes());

app.listen({ port: 3000 });