# Rabbit MQ e AMQPLIB

Código que implementa amqplib utilizando Rabbit MQ

## Rabbit MQ
```
I - Open terminal
II - docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
III - Open browser
IV - launch localhost:15672
V - user:guest / password:guest
```

## Uso

```
I - git clone https://github.com/joaovitor32/queue-driver
II - cd ./queue-driver
III - npm i
IV - npm start
```

## Importante
```
É necessário modificar o arquivo env
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