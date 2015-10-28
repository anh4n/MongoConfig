Package.describe({
    name: 'invictus:mongo-config',
    version: '1.0.1',
    summary: 'Simple Object to use MongoDb as Key-Value-Store in Meteor',
    git: 'https://github.com/Invictus1337/MongoConfig',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.use('mongo');

    api.addFiles('mongo-config.js');

    api.export('MongoConfig');
});


