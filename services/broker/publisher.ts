import type { BasicProperties } from "https://deno.land/x/amqp@v0.24.0/mod.ts";
import { getRabbitMqConnection } from "./connection.ts";

export const publishMessage = async (queue: string, message: Record<string, unknown>) => {
    const connection = await getRabbitMqConnection();
    const channel = await connection.openChannel();
    await channel.declareQueue({ queue, durable: true });

    await channel.publish(
        { routingKey: queue },
        {
            contentType: "application/json",
            timestamp: Date.now(),
            // deliveryMode: 2, // Persistent message
            // correlationId: "unique-id-12345",
        } as BasicProperties,
        new TextEncoder().encode(JSON.stringify(message))
    );
    console.log(`Message sent to ${queue}`);

    await channel.close();
}