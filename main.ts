import { Application, Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const app = new Application();
const router = new Router();

router.get('/get', (context) => {
  context.response.body = 'Hello from oak with deno!';
});

router.get("/api/v1/users", (context) => {
  context.response.body = { users: ["John", "Jane", "Alice"] };
});

router.post("/api/v1/login", async (context) => {
  const body = await context.request.body({ type: "json" }).value;
  const { username, password } = body;

  if (username === "admin" && password === "secret") {
    context.response.body = { message: "Login successful" };
  } else {
    context.response.status = 401;
    context.response.body = { message: "Invalid credentials" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('server running on port 8000');
await app.listen({ port: 8000 });