import type { Context } from "@oak/oak";

export const getPaginationParams = (ctx: Context) => {
    const query = ctx.request.url.searchParams;
    const page = parseInt(query.get("page") || "1", 10);
    const limit = parseInt(query.get("limit") || "20", 10);

    if (isNaN(page) || page <= 0) {
        throw new Error(`Invalid 'page' parameter: ${page}`);
    }
    if (isNaN(limit) || limit <= 0) {
        throw new Error(`Invalid 'page' parameter: ${page}`);
    }

    return { page, limit }
}