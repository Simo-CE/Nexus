import { getRabbitMqConnection } from "./connection.ts";

type MessageHandler = (message: Record<string, unknown>) => Promise<void>;

const handlers: { [queue: string]: MessageHandler } = {};

export const registerHandler = (queue: string, handler: MessageHandler) => {
    handlers[queue] = handler;
}

export const _consumeMessages = async () => {
    const connection = await getRabbitMqConnection();
    const channel = await connection.openChannel();

    console.log(handlers);
    for (const [queue, handler] of Object.entries(handlers)) {
        await channel.declareQueue({ queue, durable: true });
        await channel.consume(
            { queue },
            async (args, props, data) => {
                const content = JSON.parse(new TextDecoder().decode(data));
                await handler(content);
                await channel.ack({ deliveryTag: args.deliveryTag });
            },
        );
    }
}

export const consumeMessages = async (queue: string): Promise<Record<string, unknown> | undefined> => {
    const connection = await getRabbitMqConnection();
    const channel = await connection.openChannel();

    await channel.declareQueue({ queue, durable: true });

    return new Promise((resolve, reject) => {
        channel.consume(
            { queue, noAck: false },
            async (args, props, data) => {
                try {
                    const content = JSON.parse(new TextDecoder().decode(data));
                    const handler = handlers[queue];
                    if (handler) {
                        await handler(content);
                    }
                    await channel.ack({ deliveryTag: args.deliveryTag });
                    resolve(content);
                } catch (error) {
                    console.error("Error processing message:", error);
                    reject(error);
                }
            }
        );
    });
};