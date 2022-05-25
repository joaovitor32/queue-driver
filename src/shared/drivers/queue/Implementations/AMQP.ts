import AppError from "../../../../shared/error/AppError";

import queuedMessages from "../../../../shared/utils/queuedMessages";
import deferred from "../../../../shared/utils/deferred";

import amqplib from "amqplib";

import {
  QueueDriverModel,
  Context,
  Channel,
  QueuedMessages,
  ConsumerTag,
  Message,
} from "../interfaces/types";

import validatePromise from "../../../../shared/utils/validatePromise";
import bufferMessage from "../../../../shared/utils/bufferMessage";

type ChannelMessage = Channel<Message>;
type DriverModelInterface = Context<ChannelMessage, QueuedMessages>;

class AMQP
  implements QueueDriverModel<DriverModelInterface, ConsumerTag, Message>
{
  context: DriverModelInterface = {
    host: "",
    vhost: "",
    queue: "",
    channel: null,
    consuming: null,
    queuedMessages: null,
    options: {},
  } as DriverModelInterface;

  /**
   * @param host -  host to connect, create channel, etc...
   * @param vhost - define a bunch of logical groups of entities
   * @param queue - name of the queue
   * @param messages - where the messages will be stored
   * @param options - general object
   */
  constructor({ host, vhost, queue, options }: DriverModelInterface) {
    this.setContext({ host, vhost, queue, options });
  }

  setContext({ host, vhost, queue, options }: DriverModelInterface): void {
    const { promise, resolve } = deferred();

    Object.defineProperties(this.context, {
      host: { value: host },
      vhost: { value: vhost },
      queue: { value: queue },
      consuming: { value: null },
      channel: { value: promise },
      queuedMessages: { value: queuedMessages() },
      options: { value: options },
    });

    resolve(this.createChannel());
  }

  async createChannel(): Promise<ChannelMessage> {
    const { host, vhost, queue, options } = this.context;
    const { durable, exclusive } = options;

    try {
      const connection = await amqplib.connect(`amqp://${host}/${vhost}`);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, {
        exclusive: exclusive || false,
        durable: durable || true,
      });
      return channel;
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  async sendAck(bufferedMessage: Message): Promise<Object> {
    const { options } = this.context;
    const { noAck, rpc } = options;

    if (!noAck && rpc) {
      const ack = await this.ack(bufferedMessage);
      return ack;
    }
  }
  async ack(message: Message): Promise<Object> {
    const { channel } = this.context;

    try {
      const acknowledgment = await (await channel).ack(message);
      return acknowledgment;
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  async enqueue(message: string): Promise<void> {
    const { channel, queue, options } = this.context;

    const { persistent, replyTo, correlationId } = options;

    const bufferedMessage = bufferMessage(message);

    try {
      await (
        await channel
      ).sendToQueue(queue, bufferedMessage, {
        persistent: persistent || false,
        replyTo,
        correlationId: correlationId || null,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  dequeue(): string[] {
    const { consuming } = this.context;
    if (validatePromise(consuming)) {
      const { queuedMessages } = this.context;

      const messages = queuedMessages.dequeue();

      return messages;
    } else {
      throw new AppError("You can not dequeue without being able to consume");
    }
  }

  async storeMessage(message: Message): Promise<void> {
    const { queuedMessages } = this.context;
    queuedMessages.enqueue(message.content);
    await this.sendAck(message);
  }

  async startConsumption(): Promise<ConsumerTag> {
    const { channel, queue, options } = this.context;
    const { noAck } = options;

    try {
      if (!(await channel)) throw new AppError("No channel connected");

      const response = await (
        await channel
      ).consume(queue, (message) => this.storeMessage(message), {
        noAck: noAck || false,
      });

      return response;
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  async consume(): Promise<void> {
    const { consuming } = this.context;

    if (!validatePromise(consuming)) {
      const { promise, resolve } = deferred();

      Object.defineProperties(this.context, {
        consuming: { value: promise },
      });

      resolve(await this.startConsumption());
    } else {
      throw new AppError("It was not possible to start queue consumption");
    }
  }
}

export default AMQP;
