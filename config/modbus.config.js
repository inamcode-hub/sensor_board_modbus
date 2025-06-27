// config/modbus.config.js
require('dotenv').config();

module.exports = {
  serialPort: process.env.MODBUS_PORT || '/dev/ttyUSB0',
  baudRate: parseInt(process.env.MODBUS_BAUD) || 57600,
  slaveIds: process.env.MODBUS_SLAVES?.split(',').map(Number) || [1, 2, 3],
  channelsPerSlave: 8,
  scaling: {
    inputMin: 0,
    inputMax: 65535,
    outputMin: 0,
    outputMax: 10,
    precision: 3,
  },
};
