import { connect, AmqpConnection } from 'https://deno.land/x/amqp@v0.24.0/mod.ts';
import { app } from '../../config/config.ts';

let connection: AmqpConnection | null = null;

export const getRabbitMqConnection = async (): Promise<AmqpConnection> => {
    if (!connection) {
        let retries = 5;
        while (retries > 0) {
            try {
                connection = await connect({ hostname: app.RABBITMQ_HOST, port: 5672 });
                console.log("Connected to RabbitMQ");
                break;
            } catch (error) {
                console.error("RabbitMQ connection failed, retrying...", error);
                retries -= 1;
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
        if (!connection) {
            throw new Error("Failed to connect to RabbitMQ after multiple attempts");
        }
    }
    return connection;
}

export const closeRabbitMqConnection = async () => {
    if (connection) {
        await connection.close();
        connection = null
    }
}