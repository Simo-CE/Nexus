import { Router } from "@oak/oak";
import UserController from "../controllers/users.controller.ts";

const usersRouter = new Router();

usersRouter.get('/users', UserController.fetch);
usersRouter.post('/users', UserController.create);
usersRouter.patch('/users', UserController.update);
usersRouter.delete('/users', UserController.remove);

export { usersRouter };