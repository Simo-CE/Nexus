import * as oak from 'https://deno.land/x/oak@v17.1.0/mod.ts';
import { createUser, verifyUser } from "../services/auth.service.ts";
// import { createUser, verifyUser } from "@services/auth.service.ts";

export const login = async (ctx: oak.Context) => {
    const { email, password } = await ctx.request.body().value;
    const user = await verifyUser(email, password);

    if (user) {
        ctx.response.body = { token: 'jwt_token' };
    } else {
        ctx.response.status = 401;
        ctx.response.body = { error: 'Invalid credentials' }
    }
}

export const register = async (ctx: oak.Context) => {
    const { email, password } = await ctx.request.body().value;
    const user = await createUser(email, password);
    ctx.response.body = { user };
}