import { Application, Router } from "@oak/oak";
import { usersRouter } from "./services/users/routes/users.routes.ts";
// import { authRoutes } from "./services/auth/routes/auth.routes.ts";

const app = new Application();
const router = new Router();

// router.use('/auth', authRoutes.routes());
router.use(usersRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

console.log('server running on port 8000');
await app.listen({ port: 8000 });