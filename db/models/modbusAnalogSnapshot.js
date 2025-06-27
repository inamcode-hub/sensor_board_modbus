// db/models/modbusAnalogSnapshot.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ModbusAnalogSnapshot', {
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    // Slave 1
    slave1_ch1_voltage: DataTypes.FLOAT,
    slave1_ch2_voltage: DataTypes.FLOAT,
    slave1_ch3_voltage: DataTypes.FLOAT,
    slave1_ch4_voltage: DataTypes.FLOAT,
    slave1_ch5_voltage: DataTypes.FLOAT,
    slave1_ch6_voltage: DataTypes.FLOAT,
    slave1_ch7_voltage: DataTypes.FLOAT,
    slave1_ch8_voltage: DataTypes.FLOAT,

    // Slave 2
    slave2_ch1_voltage: DataTypes.FLOAT,
    slave2_ch2_voltage: DataTypes.FLOAT,
    slave2_ch3_voltage: DataTypes.FLOAT,
    slave2_ch4_voltage: DataTypes.FLOAT,
    slave2_ch5_voltage: DataTypes.FLOAT,
    slave2_ch6_voltage: DataTypes.FLOAT,
    slave2_ch7_voltage: DataTypes.FLOAT,
    slave2_ch8_voltage: DataTypes.FLOAT,

    // Slave 3
    slave3_ch1_voltage: DataTypes.FLOAT,
    slave3_ch2_voltage: DataTypes.FLOAT,
    slave3_ch3_voltage: DataTypes.FLOAT,
    slave3_ch4_voltage: DataTypes.FLOAT,
    slave3_ch5_voltage: DataTypes.FLOAT,
    slave3_ch6_voltage: DataTypes.FLOAT,
    slave3_ch7_voltage: DataTypes.FLOAT,
    slave3_ch8_voltage: DataTypes.FLOAT,
  }, {
    tableName: 'modbus_analog_snapshots',
    timestamps: false,
  });
};
