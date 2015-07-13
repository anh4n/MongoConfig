# MongoConfig #
Simple Object to use MongoDb as *Key-Value-Store* in Meteor

The name of the used collection is `config`

## Usage ##
#### Set value ####

    MongoConfig.set('mykey', 'myvalue');

#### Get value ####

    MongoConfig.get('mykey');

#### Delete key ####

    MongoConfig.delete('mykey');
