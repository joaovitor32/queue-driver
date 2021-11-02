import "reflect-metadata";
import "dotenv/config";

import config from "@config/message";

import QueueSingletonDriver from "@shared/drivers/queue";

const queueSingletonDriver = QueueSingletonDriver.getInstance({
  host: config.host,
  vhost: config.vhost,
  queue: "queue1",
  options: {
    noAck: false,
    persisent: true,
    rpc: true,
  },
});

const main = async () => {
  await queueSingletonDriver.enqueue("message");
  await queueSingletonDriver.enqueue("message 1");

  await queueSingletonDriver.consume();

  const response = queueSingletonDriver.dequeue();
  console.log(response);
};

main();
