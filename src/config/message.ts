interface MessageConfig {
  driver: "amqp";
  host: string;
  vhost: string;
}

export default {
  driver: process.env.MESSAGE_DRIVER || "amqp",
  host: process.env.HOST,
  vhost: process.env.VHOST,
} as MessageConfig;
