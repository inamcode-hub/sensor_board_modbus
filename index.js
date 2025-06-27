// index.js
require('dotenv').config();
const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const defineSnapshotModel = require('./db/models/modbusAnalogSnapshot');
const pollOnce = require('./modbus/poller');
const createHttpServer = require('./server/express');
const setupWebSocket = require('./server/websocket');


const POLL_INTERVAL_MS = 1000; // ⏱️ Adjust delay here

const Snapshot = defineSnapshotModel(sequelize, DataTypes);

let interval = null;

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected.');

    await sequelize.sync(); // optional: { alter: true }
    console.log('✅ Models synced.');

    const httpServer = createHttpServer();
const { broadcast } = setupWebSocket(httpServer);



// Start listening
httpServer.listen(process.env.WEB_PORT || 4000, () =>
  console.log(`🌍 WebSocket + Web running on :${process.env.WEB_PORT || 4000}`)
);

    // Begin polling in loop
    interval = setInterval(() => {
      pollOnce(broadcast).catch((err) => {
        console.error('❌ Polling error:', err.message);
      });
    }, POLL_INTERVAL_MS);

    console.log(`🚀 Polling started every ${POLL_INTERVAL_MS}ms`);

  } catch (err) {
    console.error('❌ Init error:', err.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  if (interval) clearInterval(interval);
  sequelize.close().then(() => {
    console.log('✅ DB closed.');
    process.exit(0);
  });
});

startApp();
