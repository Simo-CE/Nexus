import type { RouterContext } from "jsr:@oak/oak";
import { db } from "../db.ts";
import { users as table } from "../models/users.ts";
import { getPaginationParams } from "@helpers/db/params.ts";

const fetch = async (ctx: RouterContext<string>) => {
    try {
        const { page, limit } = getPaginationParams(ctx);
        const offset = (page - 1) * limit;
        const users = await db.select().from(table).limit(limit).offset(offset);
        const total: any = db.$count(table);
        console.log(total, typeof total);
        const totalPages = Math.ceil(total[0].count / limit);

        const res = {
            users,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
                total: total[0].count
            }
        }

        return ctx.response.body = res;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { error: (error as Error).message || error };
    }
};

const create = () => { }
const update = () => { }
const remove = () => { }

const UserController = {
    fetch,
    create,
    update,
    remove
}

export default UserController;