var mongoclient = require('mongodb').MongoClient;
var uri = "mongodb://stein:steinstein@cluster0-shard-00-00-ywtuf.mongodb.net:27017,cluster0-shard-00-01-ywtuf.mongodb.net:27017,cluster0-shard-00-02-ywtuf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoclient.connect(uri, function(err, db) {
  // Paste the following examples here
  if(err)
        console.log(err);
  db.close();
});
