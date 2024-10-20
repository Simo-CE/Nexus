import { Application } from 'oak';
import authRouter from '../routes/auth.routes.ts'
// import authRouter from '@routes/auth.routes.ts'

// Application instance
const app = new Application();

// Register routes
app.use(authRouter.routes());
app.use(authRouter.allowMethod());

console.log('Auth service running on port 8001');

await app.listen({ port: 8001 })