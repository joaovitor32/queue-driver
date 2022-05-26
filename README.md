# Queue-driver - Rabbit MQ e AMQPLIB

Code that implements amqplib using Rabbit MQ

## To use

```
npm i queue-driver
```

## Driver that can be used at the moment
```
    amqp
```

### Functions

| Function             | Parameters |
| -------------------- | -------- | 
| createChannel                |      
| sendAck                | bufferMessage:string     
| ack            | message  : { content: Buffer; [key: string]: string | number | Object;}
| enqueue | message:string
| dequeue 
| startConsumption
| consume 

## Usage

```ts
const queueSingletonDriver = QueueSingletonDriver.getInstance({
  host: "host",
  vhost: "vhost",
  queue: "queue1",
  options: {
    noAck: false,
    persisent: true,
    rpc: true,
  },
});

const main = async () => {
  await queueSingletonDriver.enqueue("message");
  await queueSingletonDriver.enqueue("message 1");

  await queueSingletonDriver.consume();

  const response = await queueSingletonDriver.dequeue();
  console.log(response);
};

main()
```

## To visualize Rabbit MQ
```
I - Open terminal
II - docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
III - Open browser
IV - launch localhost:15672
V - user:guest / password:guest
```

## To try locally

```
I - git clone https://github.com/joaovitor32/queue-driver
II - cd ./queue-driver
III - npm i
IV - npm start
```

## To test:

```
I - npm run test:coverage 
```

## References:
```
I - https://newbedev.com/resolve-javascript-promise-outside-function-scope
II - https://renatoaurefer.medium.com/promessas-em-javascript-feb83571cf11
```
