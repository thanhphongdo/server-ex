const uuidv1 = require('uuid/v1');
var express = require('express')
    , path = require('path')
    , app = express()
    , ParseServer = require('parse-server').ParseServer
    , ParseDashboard = require('parse-dashboard')
    , config = require('./config/config')
    , Parse = require('parse/node')
    , api = new ParseServer(config.parseServer)
    , dashboard = new ParseDashboard({
        apps: [config.parseServer],
        users: config.dashboardUsers
    }
    , config.allowInsecureHttp)

Parse.initialize(config.parseServer.appId, config.parseServer.clientKey, config.parseServer.masterKey);
Parse.serverURL = config.parseServer.serverURL;
Parse.User.enableUnsafeCurrentUser();

app.use(express.static('assets'));

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /example-api URL prefix
app.use('/example-api', api);

app.use('/-board', dashboard);

var httpServer = require('http').createServer(app);

httpServer.listen(config.port, function () {
    console.log('-\t----------Server Info----------');
    console.log('-\tEnvironment: ', process.env.ENV);
    console.log('-\tServer running on port: ', config.port);
    console.log('-\tApp name: ', config.parseServer.appName);
    console.log('-\tApp Id: ', config.parseServer.appId);
    console.log('-\tCloud: ', config.parseServer.cloud);
    console.log('-\tDatabase URI: ', config.parseServer.databaseURI);
    console.log('-\tMaster Key: ', config.parseServer.masterKey);
    console.log('-\tServer URL: ', config.parseServer.serverURL);
    console.log('-\tBaseHttpsURL URL: ', config.baseHttpsURL);
    console.log('-\t-------------------------------');
});

ParseServer.createLiveQueryServer(httpServer);