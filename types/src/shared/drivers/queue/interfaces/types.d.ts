/// <reference types="node" />
export interface ConsumerTag {
    consumerTag: string;
}
export interface Message {
    content: Buffer;
    [key: string]: string | number | Object;
}
export interface Channel<K> {
    ack(message: K): Promise<Object>;
    assertQueue(queue: string, options?: Object): any;
    sendToQueue(queue: string, message: Buffer, options?: Object): Promise<void>;
    consume(queue: string, callback: Function, options?: Object): Promise<any>;
}
export interface QueuedMessages {
    messages: Buffer[];
    enqueue(message: Buffer): void;
    dequeue(): string[];
}
export interface QueueDriverModel<T, U, K> {
    setContext(context: T): void;
    storeMessage(content: K): Promise<void>;
    consume(): Promise<void>;
    startConsumption(): Promise<U>;
    sendAck(message: K): Promise<Object>;
    ack(message: K): Promise<Object>;
    enqueue(message: string): Promise<void>;
    dequeue(): string[];
}
export interface Context<T, U> {
    host: string;
    vhost: string;
    queue: string;
    consuming?: Promise<T>;
    channel?: Promise<T>;
    queuedMessages?: U;
    options?: {
        [key: string]: string | number | boolean;
    };
}
