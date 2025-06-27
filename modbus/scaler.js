// modbus/scaler.js
const { scaling } = require('../config/modbus.config');

function scaleToVoltage(rawValue) {
  const { inputMin, inputMax, outputMin, outputMax, precision } = scaling;

  const clamped = Math.max(inputMin, Math.min(inputMax, rawValue));
  const scaled = outputMin + (clamped - inputMin) * (outputMax - outputMin) / (inputMax - inputMin);

  return parseFloat(scaled.toFixed(precision));
}

module.exports = scaleToVoltage;
