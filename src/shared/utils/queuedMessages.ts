import { QueuedMessages } from "@shared/drivers/queue/interfaces/types";

const queuedMessages = (): QueuedMessages => {
  const messages = Array<Buffer>();
  return Object.freeze({
    messages,
    enqueue(message: Buffer) {
      const foundedMessage = messages.find((mess) => message === mess);
      if (!foundedMessage) {
        messages.push(message);
      }
    },
    dequeue() {
      if (messages.length === 0) {
        return [];
      }

      const copy = messages.map(
        (elem) => elem.toString().match(/"([^"]*)"/)[1]
      );
      while (messages.length != 0) {
        messages.pop();
      }

      return copy;
    },
  });
};

export default queuedMessages;
