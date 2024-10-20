import { Application } from "https://deno.land/x/oak/mod.ts";
import { gatewayRoutes } from "./src/routes/gateway.routes.ts";
import { errorHandler } from "../shared/middlewares/errorHandler.ts";

const app = new Application();

// Global middlewares
app.use(errorHandler);

// Gateway routes
app.use(gatewayRoutes.routes());
app.use(gatewayRoutes.allowedMethods());

console.log("API Gateway running on port 8000");
await app.listen({ port: 8000 });
