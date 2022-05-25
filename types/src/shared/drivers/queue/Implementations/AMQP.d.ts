import { QueueDriverModel, Context, Channel, QueuedMessages, ConsumerTag, Message } from "../interfaces/types";
declare type ChannelMessage = Channel<Message>;
declare type DriverModelInterface = Context<ChannelMessage, QueuedMessages>;
declare class AMQP implements QueueDriverModel<DriverModelInterface, ConsumerTag, Message> {
    context: DriverModelInterface;
    /**
     * @param host -  host to connect, create channel, etc...
     * @param vhost - define a bunch of logical groups of entities
     * @param queue - name of the queue
     * @param messages - where the messages will be stored
     * @param options - general object
     */
    constructor({ host, vhost, queue, options }: DriverModelInterface);
    setContext({ host, vhost, queue, options }: DriverModelInterface): void;
    createChannel(): Promise<ChannelMessage>;
    sendAck(bufferedMessage: Message): Promise<Object>;
    ack(message: Message): Promise<Object>;
    enqueue(message: string): Promise<void>;
    dequeue(): string[];
    storeMessage(message: Message): Promise<void>;
    startConsumption(): Promise<ConsumerTag>;
    consume(): Promise<void>;
}
export default AMQP;
