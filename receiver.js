'use strict'
const redis    = require("redis");
const uuidv1   = require('uuid/v1');

const Receiver = function(config) {

  // temporary hash
  const messagesHash = 'messagesHash',
        statusHash   = 'statusHash'

  // create a client to subscribe to the listening of expired keys
  const listenerClient = redis.createClient(config);
  listenerClient.psubscribe("__keyevent@0__:expired");

  // push Message
  const pushMessage = function(pattern, channel, expiredKey) {

    client.hincrby(statusHash, expiredKey, 1, (err, status)=> {

      if (err) return console.log(err);
      if (status > 1) return;
      client.hget(messagesHash, expiredKey, (err, value)=> {

        if (err) return console.log(err);
        client.hdel(messagesHash,expiredKey);
        client.hdel(statusHash,expiredKey);

        console.log(`\n====================================================== Message Received:
          Key: ${expiredKey}
          Value: ${value}`);
      })
    });

  };

  // when a message is received...
  listenerClient.on("pmessage", pushMessage);

  // create a client for add messages to the queue
  const client = redis.createClient(config);

  // check old messages
  const checkOldMessages = function() {

    client.hkeys(messagesHash, function (err, keys) {

      if (err) return console.log(err);
      for(let i = 0; i < keys.length; i++) {
        client.get(keys[i], (err, value)=> {
          if (value === null) pushMessage(null, null, keys[i])
        });
      }

    });
  };

  // write message to the queue
  this.echoAtTime = function(message, delay) {

    let key = uuidv1();
    client.set(key, '', 'EX', delay);
    client.hset(messagesHash,key, message);
    client.hset(statusHash,key, 0);

    console.log(`\n---------------------------------------------------------- Message Sent:
      Key: ${key}
      Value: ${message}
      Delay: ${delay}s`
    );
  };

  checkOldMessages();
}

module.exports = Receiver;
