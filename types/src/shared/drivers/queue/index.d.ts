import { Channel } from "amqplib";
import { QueueDriverModel, Context, Message, QueuedMessages, ConsumerTag } from "./interfaces/types";
declare class QueueSingleton {
    private static instance;
    static getInstance({ host, vhost, queue, options, }: {
        host: any;
        vhost: any;
        queue: any;
        options: any;
    }): QueueDriverModel<Context<Channel, QueuedMessages>, ConsumerTag, Message>;
}
export default QueueSingleton;
