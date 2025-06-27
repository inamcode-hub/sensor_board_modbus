// modbus/watchdog.js
const MAX_FAILURES = 5;

const slaveStatus = {
  1: { fails: 0 },
  2: { fails: 0 },
  3: { fails: 0 },
};

function recordSuccess(slaveId) {
  slaveStatus[slaveId].fails = 0;
}

function recordFailure(slaveId) {
  const s = slaveStatus[slaveId];
  s.fails++;

  if (s.fails >= MAX_FAILURES) {
    console.warn(`⚠️ Slave ${slaveId} failing repeatedly (${s.fails}x)`);
  }
}

function getStatus(slaveId) {
  return slaveStatus[slaveId];
}

function resetAll() {
  Object.keys(slaveStatus).forEach((id) => (slaveStatus[id].fails = 0));
}

module.exports = {
  recordSuccess,
  recordFailure,
  getStatus,
  resetAll,
};
