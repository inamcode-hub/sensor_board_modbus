// index.js
require('dotenv').config();
const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const defineSnapshotModel = require('./db/models/modbusAnalogSnapshot');
const pollOnce = require('./modbus/poller');
const createHttpServer = require('./server/express');
const setupWebSocket = require('./server/websocket');
const logger = require('./utils/logger');


// ⏱️ Adjust delay here and there is no error on 200 ms below this error
const POLL_INTERVAL_MS = 1000; 

const Snapshot = defineSnapshotModel(sequelize, DataTypes);

let interval = null;

async function startApp() {
  try {
    await sequelize.authenticate();
   
    logger.info('✅ DB connected.');

    await sequelize.sync(); // optional: { alter: true }
    logger.info('✅ DB synced.');

    const httpServer = createHttpServer();
const { broadcast } = setupWebSocket(httpServer);



// Start listening
httpServer.listen(process.env.WEB_PORT || 4000, () =>

logger.info(`🌍 WebSocket + Web running on :${process.env.WEB_PORT || 4000}`
));

    // Begin polling in loop
    interval = setInterval(() => {
      pollOnce(broadcast).catch((err) => {
        logger.error(`❌ Polling error: ${err.message}`);
       
      });
    }, POLL_INTERVAL_MS);

    logger.info(`⏱️ Polling every ${POLL_INTERVAL_MS} ms`);

  } catch (err) {
    logger.error(`❌ Failed to start app: ${err.message}`);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {

  logger.info('🛑 Shutting down...');
  if (interval) clearInterval(interval);
  sequelize.close().then(() => {
    logger.info('✅ DB connection closed.');
    process.exit(0);
  });
});

startApp();
