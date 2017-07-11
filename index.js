'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "xq7fK5Vz8DJvF/f4SbcKjh79jH3PNneduqlJIuHPykbs4vUOrQsnFqxvgPetNTIlyb0ld0REvYwy6uWHwl7NfZhZ0m248Qt7CbZ5c1vN3hd347nPSxgJeuXdrPfEjJ/8WwnoOhBqnlybR1vBSbcYEgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "a3580b769ab39c7e5c6a80585b77a3b0",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
