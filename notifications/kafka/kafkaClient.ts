// kafkaClient.ts
import { Kafka, Producer, Consumer } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "localhost:29092").split(",");

export function makeKafka(clientId: string) {
  const kafka = new Kafka({ clientId, brokers });
  return kafka;
}

// Producer singleton
let _producer: Producer | null = null;
export async function getProducer(kafkaInstance: ReturnType<typeof makeKafka>) {
  if (_producer) return _producer;
  _producer = kafkaInstance.producer();
  await _producer.connect();
  return _producer;
}

// Factory for consumer (create per service)
export function createConsumer(kafkaInstance: ReturnType<typeof makeKafka>, groupId: string): Consumer {
  return kafkaInstance.consumer({ groupId });
}
