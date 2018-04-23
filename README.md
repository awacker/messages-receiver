### Description

Rest API with method **/api/echo-at-time** - which receives two parameters, time and message, and writes that message to the server console at the given time.

The application uses Redis to persist the messages and the time they should be sent to. There might be more than one server running behind a load balancer.

In case the server was down when a message should have been printed, it will be print it out when going back online.

### Usage

```
npm install
npm start
```

### Api
```
POST /api/echo-at-time
body: {
  message: "text"
  delay: 10
}
```


### Prerequisites
Node.js v8.0.0 or later needed.
Make sure redis-server running with following params:
```
 redis-server --notify-keyspace-events Ex
```
