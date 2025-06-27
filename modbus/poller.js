// modbus/poller.js
const createClient = require('./client');
const scaleToVoltage = require('./scaler');
const config = require('../config/modbus.config');
const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const defineSnapshotModel = require('../db/models/modbusAnalogSnapshot');
const { recordSuccess, recordFailure } = require('./watchdog');
const logger = require('../utils/logger');

const Snapshot = defineSnapshotModel(sequelize, DataTypes);

// modbus/poller.js
async function pollOnce(broadcast) {
  const client = await createClient();
  const result = {};

  try {
    for (const slaveId of config.slaveIds) {
      client.setID(slaveId);
      const { data } = await client.readInputRegisters(0, config.channelsPerSlave);
      data.forEach((raw, index) => {
        const voltage = scaleToVoltage(raw);
        const fieldName = `slave${slaveId}_ch${index + 1}_voltage`;
        result[fieldName] = voltage;
      });
    }

    result.timestamp = new Date();
    await Snapshot.create(result);
   
    logger.info(`[Modbus Poller] 📥 Snapshot written: ${JSON.stringify(result)}`);

    // ✅ Broadcast only if function is passed
    if (broadcast) broadcast(result);

  } catch (err) {
  
    logger.error(`[Modbus Poller] ❌ Error: ${err.message}`);
  } finally {
    client.close();
  }
}

module.exports = pollOnce;


module.exports = pollOnce;
