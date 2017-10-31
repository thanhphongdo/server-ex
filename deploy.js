var pm2 = require('pm2');

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  console.log('-connected');
  
  pm2.start({
    script    : 'index.js',         // Script to be run
    name: "jk-api-dev"
  }, function(err, apps) {
    console.log('-start');
    pm2.disconnect();   // Disconnect from PM2
    if (err) throw err
  });
});