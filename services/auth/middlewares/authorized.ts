import type { Next, RouterContext } from 'jsr:@oak/oak';
import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

// Function to convert the string secret to a CryptoKey
async function importSecretKey(secret: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
        "raw", // The format of the key
        new TextEncoder().encode(secret), // Encoding the string to bytes
        { name: "HMAC", hash: "SHA-256" }, // Algorithm and hash to use
        false, // Whether the key can be exported
        ["sign", "verify"], // Key usage
    );
}

const authorized = async (ctx: RouterContext<string>, next: Next) => {
    // const authorized = async (ctx: RouterContext<string>, next: () => Promise<void>) => {
    const authorization = ctx.request.headers.get("Authorization");

    if (!authorization) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'user unauthorized' };
        return;
    }

    try {
        const token = authorization.replace("Beared ", "");
        const decodeSecret = Deno.env.get('REFRESH_TOKEN_SECRET') || '';
        const cryptoKey = await importSecretKey(decodeSecret);
        const payload = await verify(token, cryptoKey);
        ctx.state.user = payload;
        await next();
    } catch (err) {
        ctx.response.status = 401;
        ctx.response.body = { error: "Invalid or expired token " + err };
    }
}

export default authorized;