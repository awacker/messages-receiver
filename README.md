### Description

echoAtTime - which receives two parameters, time and message, and writes that message to the server console at the given time.

Since we want the server to be able to withstand restarts it will use redis to persist the messages and the time they should be sent at. You should also assume that there might be more than one server running behind a load balancer (load balancing implementation itself does not need to be provided as part of the answer)

In case the server was down when a message should have been printed, it should print it out when going back online.

The application should preferably be written in node.js. The focus of the exercise is the efficient use of redis and its data types as well as seeing your code in action.

### Usage

```
npm install
npm start
```

### Api

POST /api/echo-at-time
body: {
  message: "text"
  delay: 10
}


### Prerequisites
Node.js v8.0.0 or later needed.
Make sure redis-server running with following params:
```
 redis-server --notify-keyspace-events Ex
```
