import amqplib from "amqplib";
import AMQP from "@shared/drivers/queue/Implementations/AMQP";

let amqpClass: AMQP;

const params = {
  host: "teste1",
  vhost: "teste1",
  queue: "queue1",
  options: {
    noAck: false,
    persisent: true,
    rpc: true,
  },
};

const mChannel = {
  assertQueue: jest.fn(),
  consume: jest.fn(),
  ack: jest.fn(),
  sendToQueue: jest.fn(),
};
const mConnection = {
  createChannel: jest.fn().mockResolvedValueOnce(mChannel),
};

describe("Test AMQP implementation -- noAck:false ", () => {
  beforeAll(() => {
    jest.spyOn(amqplib, "connect").mockResolvedValueOnce(mConnection);
    amqpClass = new AMQP(params);
  });

  beforeEach(() => {
    mConnection.createChannel.mockReset();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Testing queue driver consumption --success", async () => {
    await amqpClass.consume();
    expect(mChannel.consume).toBeCalledTimes(1);
  });

  it("Testing queue driver dequeue --success", async () => {
    const resp = await amqpClass.dequeue();

    expect(resp).toEqual([]);
  });

  it("Testing queue driver storeMessage --success", async () => {
    const content = { content: Buffer.from("message1") };
    await amqpClass.storeMessage(content);

    expect(mChannel.ack).toBeCalledTimes(1);
  });

  it("Testing queue driver enqueue --success", async () => {
    await amqpClass.enqueue("Message1");

    expect(mChannel.sendToQueue).toBeCalledTimes(1);
  });
});
