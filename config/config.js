var env = process.env.ENV || 'dev'
    , path = require('path')
    , configs = {};

configs.dev = {
    port: 3778,
    httpsPort: 3779,
    httpsDomain: 'http://social-local.com:3778/example-api',
    dashboardUsers: [{
        user: 'root',
        pass: 'r00t'
    }],
    parseServer: {
        appName: 'example.test',
        databaseURI: 'mongodb://root:r00t@cluster0-shard-00-00-b60zw.mongodb.net:27017,cluster0-shard-00-01-b60zw.mongodb.net:27017,cluster0-shard-00-02-b60zw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
        cloud: path.resolve('./cloud/main.js'),
        appId: 'example-Test-APPID',
        masterKey: 'example-MSTK', //Add your master key here. Keep it secret!
        serverURL: 'http://social-local.com:3778/example-api',  // Don't forget to change to https if needed
        liveQuery: {
            classNames: ['Notify', 'Conversion', 'Message', 'Comments', 'Likes']
        },
        maxUploadSize: '10mb'
    },
    allowInsecureHttp: true
}
module.exports = configs[env];
