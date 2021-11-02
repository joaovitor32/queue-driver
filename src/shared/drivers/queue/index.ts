import { Channel } from "amqplib";

import message from "@config/message";

import {
  QueueDriverModel,
  Context,
  Message,
  QueuedMessages,
  ConsumerTag,
} from "./interfaces/types";

import AMQPImplementation from "./Implementations/AMQP";

const providers = Object.freeze({
  amqp: AMQPImplementation,
});

class QueueSingleton {
  private static instance: QueueDriverModel<
    Context<Channel, QueuedMessages>,
    ConsumerTag,
    Message
  >;

  public static getInstance({
    host,
    vhost,
    queue,
    options,
  }): QueueDriverModel<Context<Channel, QueuedMessages>, ConsumerTag, Message> {
    if (!QueueSingleton.instance) {
      QueueSingleton.instance = new providers[message.driver]({
        host,
        vhost,
        queue,
        options,
      });
    }

    return QueueSingleton.instance;
  }
}

export default QueueSingleton;
