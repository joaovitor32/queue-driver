const bufferMessage = (message: string): Buffer => {
  return Buffer.from(JSON.stringify(message));
};

export default bufferMessage;
