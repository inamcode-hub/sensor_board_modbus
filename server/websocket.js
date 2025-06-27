// server/websocket.js
const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('📡 Client connected');

    ws.on('close', () => {
      console.log('🔌 Client disconnected');
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
