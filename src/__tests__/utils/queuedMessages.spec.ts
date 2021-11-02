import bufferMessage from "@shared/utils/bufferMessage";
import queuedMessages from "@shared/utils/queuedMessages";

describe("Test queued messages", () => {
  it("Check inserted element", () => {
    const message1 = "message1";
    const { enqueue, dequeue } = queuedMessages();
    enqueue(bufferMessage(message1));

    expect(dequeue()[0]).toEqual(message1);
  });
});
