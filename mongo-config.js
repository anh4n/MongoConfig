/**
 * @class MongoConfig
 */
MongoConfig = {
    /**
     * @cfg {String}
     */
    collectionName: 'config',
    /**
     * @cfg {Mongo.Collection}
     */
    collection: null,
    /**
     * @param {String} key
     * @param {String} value
     */
    setKey: function (key, value) {
        if (this.getKey(key) !== undefined) {
            Meteor.call("updateConfig", key, value);
        } else {
            Meteor.call("insertConfig", key, value);
        }
    },
    /**
     * @param {String} key
     * @param {Mixed} defaultValue
     * @return {Mixed|null}
     */
    getKey: function (key, defaultValue) {
        var cursor = this.collection.findOne({_id: key});

        if (cursor) {
            return cursor.value;
        } else {
            return (defaultValue) ? defaultValue : undefined;
        }
    },
    /**
     * @param {String} key
     */
    deleteKey: function (key) {
        Meteor.call("removeConfig", key);
    }
};

/**
 * @cfg {Mongo.Collection}
 */
MongoConfig.collection = new Mongo.Collection(MongoConfig.collectionName);

Meteor.methods({
    /**
     * @param {String} key
     * @param {String} value
     */
    insertConfig: function (key, value) {
        MongoConfig.collection.insert({_id: key, value: value});
    },
    /**
     * @param {String} key
     * @param {String} value
     */
    updateConfig: function (key, value) {
        MongoConfig.collection.update(key, {$set: {value: value}});
    },
    /**
     * @param {String} key
     */
    removeConfig: function (key) {
        MongoConfig.collection.remove(key);
    }
});

if (Meteor.isClient) {
    Meteor.subscribe(MongoConfig.collectionName);
}

if (Meteor.isServer) {
    Meteor.publish(MongoConfig.collectionName, function () {
        return MongoConfig.collection.find({});
    });
}
