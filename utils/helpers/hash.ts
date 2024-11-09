import { hash, verify } from "jsr:@ts-rex/bcrypt"

export const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password);
    return hashedPassword;
}

export const verifyPassword = (password: string, hash: string) => {
    return verify(password, hash)
}