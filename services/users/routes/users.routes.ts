import { Router } from "@oak/oak";
import UserController from "../controllers/users.controller.ts";

const usersRouter = new Router();

usersRouter.get('/users', UserController.fetch);
usersRouter.post('/user', UserController.create);
usersRouter.patch('/user/:id', UserController.update);
usersRouter.delete('/user/:id', UserController.remove);

export { usersRouter };