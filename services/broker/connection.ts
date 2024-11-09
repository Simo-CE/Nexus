import { connect, AmqpConnection } from 'https://deno.land/x/amqp@v0.24.0/mod.ts';

let connection: AmqpConnection | null = null;

export const getRabbitMqConnection = async (): Promise<AmqpConnection> => {
    if (!connection) {
        connection = await connect({ hostname: "rabbitmq", port: 5672 });
    }
    return connection;
}

export const closeRabbitMqConnection = async () => {
    if (connection) {
        await connection.close();
        connection = null
    }
}