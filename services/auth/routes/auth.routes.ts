import * as oak from "jsr:@oak/oak";
import { Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";
// import { login, register } from "../controllers/auth.controller.ts";
import { login } from "@controllers/auth.controller.ts";

const authRoutes = new Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);

export { authRoutes };