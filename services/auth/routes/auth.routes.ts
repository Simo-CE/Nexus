import { Router } from "jsr:@oak/oak";
import { login, refreshToken, register } from "../controllers/auth.controller.ts";
import authorized from "../middlewares/authorized.ts";

const authRoutes = new Router();

authRoutes.post('/login', login);
authRoutes.post('/refresh-token', refreshToken);
authRoutes.post('/register', register);

// authRoutes.get("/protected", authorized, (ctx: any) => {
//     ctx.response.status = 200;
//     ctx.response.body = { message: "You have access to this protected route", user: ctx.state.user };
// });

export { authRoutes };