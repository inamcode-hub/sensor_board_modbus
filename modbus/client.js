// modbus/client.js
const ModbusRTU = require('modbus-serial');
const config = require('../config/modbus.config');
const logger = require('../utils/logger');

function createClient() {
  const client = new ModbusRTU();

  return new Promise((resolve, reject) => {
    client.connectRTUBuffered(config.serialPort, { baudRate: config.baudRate })
      .then(() => {
      
        logger.info(`[Modbus Client] ✅ Connected to ${config.serialPort} at ${config.baudRate} baud`);
        client.setTimeout(1000); // Optional timeout per request
        resolve(client);
      })
      .catch((err) => {
      
        logger.error(`[Modbus Client] ❌ Connection error: ${err.message}`);
        reject(err);
      });
  });
}

module.exports = createClient;
