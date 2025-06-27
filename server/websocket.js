// server/websocket.js
const WebSocket = require('ws');
const logger = require('../utils/logger');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
   logger.info('[WebSocket] 🔌 Client connected');

    ws.on('close', () => {
      logger.info('[WebSocket] 🔌 Client disconnected');
    });
  });

  function broadcast(data) {
    const payload = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  return { broadcast };
}

module.exports = setupWebSocket;
