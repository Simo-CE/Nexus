import { getRabbitMqConnection } from "./connection.ts";

type MessageHandler = (message: Record<string, unknown>) => Promise<void>;

const handlers: { [queue: string]: MessageHandler } = {};

export const registerHandler = (queue: string, handler: MessageHandler) => {
    handlers[queue] = handler;
}

export const consumeMessages = async () => {
    const connection = await getRabbitMqConnection();
    const channel = await connection.openChannel();

    for (const [queue, handler] of Object.entries(handlers)) {
        await channel.declareQueue({ queue, durable: true });
        await channel.consume(
            { queue },
            async (msg) => {
                if (msg) {
                    console.log('recieved message', msg);
                    // const content = JSON.parse(new TextDecoder().decode(msg.content));
                    // await handler(content);
                    // msg.ack();
                }
            }
        )
    }
}