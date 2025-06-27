// modbus/client.js
const ModbusRTU = require('modbus-serial');
const config = require('../config/modbus.config');

function createClient() {
  const client = new ModbusRTU();

  return new Promise((resolve, reject) => {
    client.connectRTUBuffered(config.serialPort, { baudRate: config.baudRate })
      .then(() => {
        console.log(`✅ Connected to ${config.serialPort} at ${config.baudRate} baud`);
        client.setTimeout(1000); // Optional timeout per request
        resolve(client);
      })
      .catch((err) => {
        console.error('❌ Failed to connect to Modbus:', err.message);
        reject(err);
      });
  });
}

module.exports = createClient;
