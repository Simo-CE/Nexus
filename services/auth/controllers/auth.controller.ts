import type { RouterContext } from 'jsr:@oak/oak';
import { hashPassword, verifyPassword } from '../../../utils/helpers/hash.ts';
import { publishMessage } from '../../broker/publisher.ts';
import { consumeMessages } from '../../broker/consumer.ts';
import nullabilitiyChecks from '../../../utils/helpers/nullabilityChecks.ts';
import { create, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

// Convert the string secret to a CryptoKey
const importSecretKey = async (secret: string): Promise<CryptoKey> => {
    return await crypto.subtle.importKey(
        "raw", // The format of the key
        new TextEncoder().encode(secret), // Encoding the string to bytes
        { name: "HMAC", hash: "SHA-256" }, // Algorithm and hash to use
        false, // Whether the key can be exported
        ["sign", "verify"], // Key usage
    );
}

const createAccessToken = async (user: any): Promise<string> => {
    const payload = { userId: user.id, username: user.username };
    const secret = Deno.env.get('ACCESS_TOKEN_SECRET') || '';
    const cryptoKey = await importSecretKey(secret);
    const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, cryptoKey);
    return jwt;
}

// Function to create Refresh Token
async function createRefreshToken(user: any): Promise<string> {
    const payload = { userId: user.id, username: user.username };
    const secret = Deno.env.get('ACCESS_TOKEN_SECRET') || '';
    const cryptoKey = await importSecretKey(secret);
    const refreshToken = await create({ alg: "HS256", typ: "JWT" }, payload, cryptoKey);
    return refreshToken;
}

export const login = async (ctx: RouterContext<string>) => {
    try {
        const { email, password } = await ctx.request.body.json();

        if (nullabilitiyChecks.isNullOrEmpty(email)) {
            ctx.response.status = 401;
            ctx.response.body = { error: 'email is required' }
        }
        if (nullabilitiyChecks.isNullOrEmpty(password)) {
            ctx.response.status = 401;
            ctx.response.body = { error: 'password is required' }
        }

        await publishMessage('user_find_one', { email });

        const user: any = await consumeMessages('user');

        if (nullabilitiyChecks.isNullOrEmpty(user)) {
            ctx.response.status = 401;
            ctx.response.body = { error: 'user was not found' }
        }

        if (user) {
            const passVerified = await verifyPassword(password, user.password);
            if (passVerified) {
                const payload = { userId: user.id, username: user.username };
                const secret = Deno.env.get('ACCESS_TOKEN_SECRET') || '';
                const cryptoKey = await importSecretKey(secret);
                const accTk = await create({ alg: 'HS256', type: 'JWT' }, payload, cryptoKey);

                ctx.response.status = 200
                ctx.response.body = {
                    id: user.id,
                    token: accTk,
                    type: user.type,
                    accessToken: accTk,
                    username: user.username,
                    email: user.email,
                    picture: user.picture,
                };
            } else {
                ctx.response.status = 401;
                ctx.response.body = { error: 'Incorrect password' }
            }
            ctx.response.body = { token: 'jwt_token' };
        } else {
            ctx.response.status = 401;
            ctx.response.body = { error: 'Invalid credentials' }
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: 'Something went wrong ' + err }
    }
}

export const refreshToken = async (ctx: RouterContext<string>) => {
    try {
        const decodeSecret = Deno.env.get('REFRESH_TOKEN_SECRET') || '';
        const decodeCryptoKey = await importSecretKey(decodeSecret);
        const { refreshToken } = await ctx.request.body.json();
        const decoded = await verify(refreshToken, decodeCryptoKey);
        const payload = { userId: decoded.userId, username: decoded.username };

        const secret = Deno.env.get('ACCESS_TOKEN_SECRET') || '';
        const cryptoKey = await importSecretKey(secret);
        const accessToken = await create({ alg: 'HS256', type: 'JWT' }, payload, cryptoKey);

        ctx.response.status = 200;
        ctx.response.body = { accessToken }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: 'Something went wrong ' + err }
    }
}

export const register = async (ctx: RouterContext<string>) => {
    const { firstName, lastName, email, password } = await ctx.request.body.json();

    if (nullabilitiyChecks.isNullOrEmpty(firstName)) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'first name is required' }
    }
    if (nullabilitiyChecks.isNullOrEmpty(lastName)) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'last name is required' }
    }
    if (nullabilitiyChecks.isNullOrEmpty(email)) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'email is required' }
    }
    if (nullabilitiyChecks.isNullOrEmpty(password)) {
        ctx.response.status = 401;
        ctx.response.body = { error: 'password is required' }
    }

    try {
        const hash = await hashPassword(password);
        await publishMessage('user_create', { firstName, lastName, email, password: hash });

        const user = await consumeMessages('user');
        if (user) {
            const accessToken = await createAccessToken(user);
            const refreshToken = await createRefreshToken(user);

            ctx.response.status = 201;
            ctx.response.body = {
                user,
                accessToken,
                refreshToken,
            };
        }
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: 'Something went wrong ' + err }
    }

}