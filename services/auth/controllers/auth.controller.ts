import type { RouterContext } from '@oak/oak';
import { hashPassword, verifyPassword } from '../../../utils/helpers/hash.ts';
import { publishMessage } from '../../broker/publisher.ts';
import { consumeMessages, registerHandler } from '../../broker/consumer.ts';

export const login = async (ctx: RouterContext<string>) => {
    const { email, password } = await ctx.request.body().value;
    await publishMessage('user_find_one', { email });
    await registerHandler('user', async (data: Record<string, unknown>) => {
        console.log('got user', data);
    });

    consumeMessages();

    // if (user && await verifyPassword(password, user.password)) {
    //     console.log('virified');
    // }

    // if (user) {
    //     ctx.response.body = { token: 'jwt_token' };
    // } else {
    //     ctx.response.status = 401;
    //     ctx.response.body = { error: 'Invalid credentials' }
    // }
}

export const register = async (ctx: RouterContext<string>) => {
    const { email, password } = await ctx.request.body().value;

    const hash = await hashPassword(password);
    await publishMessage('user_create', { email, password: hash })

    // ctx.response.body = { user };
}