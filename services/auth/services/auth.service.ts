import User from '@models/user.model.ts';
import { hashPassword, verifyPassword } from '@utils/hash.ts';

export const createUser = async (email: string, password: string) => {
    const hash = await hashPassword(password);
    const user = await User.create({ email, password: hash });
    return user;
}

export const verifyUser = async (email: string, password: string) => {
    const user = User.findOne({ where: { email } });
    if (user && await verifyPassword(password, user.password)) {
        return user;
    }
    return null;
}