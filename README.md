# MongoConfig #
Simple Object to use MongoDb as *Key-Value-Store* in Meteor

The name of the used collection is `config`

## Installation ##

    meteor add invictus:mongo-config

## Usage ##

#### Set value ####

    MongoConfig.setKey('myKey', 'myValue');

#### Get value ####

    MongoConfig.getKey('myKey');
    
#### Get default value ####

    MongoConfig.getKey('myKey', 'myDefaultValue');

#### Delete key ####

    MongoConfig.deleteKey('myKey');
