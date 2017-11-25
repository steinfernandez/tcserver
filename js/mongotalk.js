var mongoclient = require('mongodb').MongoClient;
var uri = "mongodb://stein:steinstein@cluster0-shard-00-00-ywtuf.mongodb.net:27017,cluster0-shard-00-01-ywtuf.mongodb.net:27017,cluster0-shard-00-02-ywtuf.mongodb.net:27017/tcserver?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoclient.connect(uri, function(err, db) {
  // Paste the following examples here
  if(err)
        console.log(err);
  //asdjfskdjfnskdjfnskjdfn
//var cursor = db.collection('users').find({ username: "user1" }, function(err,result) { console.log(result.username); });
db.collection("users").find({ username:"user1"}, { }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
});
});

function boardObj()
{
        this.addCategory = addCategory;
        this.removeCategory = removeCategory;
        this.updateCategory = updateCategory;
}

function userObj()
{
        this.signUp = signUp;
        this.logIn = logIn;
        this.logOut = logOut;
}

function addCategory(username,newcat)
{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) throw err;
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) throw err1;
                        console.log("1 user found");
                        result1.board.push(newcat);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) throw err2;
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
}

function removeCategory(username,delcat)
{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) throw err;
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) throw err1;
                        console.log("1 user found");
                        result1.board = result1.board.filter(cat => cat.categoryName != delcat);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) throw err2;
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
}

function updateCategory(username,oldcat,newcat)
{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) throw err;
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) throw err1;
                        console.log("1 user found");
                        Object.assign(result1.board.find(cat => cat.categoryName == oldcat), newcat);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) throw err2;
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
}

var board = new boardObj();

var mongotalk = { board:board };

module.exports = mongotalk;

//var newcat = {categoryName:"kittens",taskList:[]};
//addCategory("user1",newcat);

//removeCategory("user1","bunnies");

//updateCategory("user1","category1",newcat);
