import { makeKafka, getProducer } from "../kafka/kafkaClient";
import { OrderPublishedEvent } from "./events";
import { CompressionTypes } from "kafkajs";

const kafka = makeKafka("orders-service");

export async function publishOrderPublished(event: Omit<OrderPublishedEvent, "createdAt">) {
  const producer = await getProducer(kafka);
  const payload: OrderPublishedEvent = { ...event, createdAt: new Date().toISOString() };
  await producer.send({
    topic: "order.published",
    messages: [{ key: event.orderId, value: JSON.stringify(payload) }],
    compression: CompressionTypes.GZIP,
  });
}
