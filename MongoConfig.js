/**
 * @class MongoConfig
 */
MongoConfig = {
    /**
     * @cfg {String}
     */
    collectionName: 'config',
    /**
     * @param {String} key
     * @param {String} value
     */
    set: function (key, value) {
        if (this.get(key)) {
            Meteor.call("updateConfig", key, value);
        } else {
            Meteor.call("insertConfig", key, value);
        }
    },
    /**
     * @param {String} key
     * @return {String|null}
     */
    get: function (key) {
        var cursor = this.collection.findOne({_id: key});

        if (cursor) {
            return cursor.value;
        } else {
            return null;
        }
    },
    /**
     * @param {String} key
     */
    delete: function (key) {
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

if (Meteor.isServer) {
    Meteor.publish(MongoConfig.collectionName, function () {
        return MongoConfig.collection.find({});
    });
}
