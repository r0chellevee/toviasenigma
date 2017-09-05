const storage = require('node-persist');

//  *** Initialize data store *** //
storage.init();
storage.initSync();

module.exports = storage
