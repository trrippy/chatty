// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require('ws');
// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colors = ['#FF0000', '#808000', '#FFFF00', '#00FFFF', '#008080', '#FF00FF']


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.broadcastUserCount = function broadcast() {
  wss.clients.forEach((client) => {
    let color = colors[Math.floor(Math.random()*colors.length)];
    console.log(color);
    let userCount = {
      type: 'clientCount',
      count: wss.clients.size,
      color: color
      // give it a color
    }
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userCount));
      ;
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastUserCount();


  ws.on('message', function incoming(message) {
    // Handle Message
    let messageObj = JSON.parse(message);
    messageObj.id = uuid.v4();
    wss.broadcast(JSON.stringify(messageObj));

    // Increase Count
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastUserCount();
  } )
});