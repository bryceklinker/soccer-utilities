const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  maxWorkers: '50%',
};
