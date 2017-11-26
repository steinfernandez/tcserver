var mongoclient = require('mongodb').MongoClient;
var uri = "mongodb://stein:steinstein@cluster0-shard-00-00-ywtuf.mongodb.net:27017,cluster0-shard-00-01-ywtuf.mongodb.net:27017,cluster0-shard-00-02-ywtuf.mongodb.net:27017/tcserver?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

function boardObj()
{
        this.addCategory = addCategory;
        this.removeCategory = removeCategory;
        this.updateCategory = updateCategory;
		this.updateAll = updateAll;
		this.retrieveAll = retrieveAll;
}

function userObj()
{
        this.create = create;
        this.auth = auth;
}

function addCategory(username,newcat)
{
	try{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
                        result1.board.push(newcat);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) console.log(err2);
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function removeCategory(username,catindex)
{
	try{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
                        result1.board.splice(catindex,1);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) console.log(err2);
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function updateCategory(username,catindex,newcat)
{
	try{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
                        //Object.assign(result1.board.find(cat => cat.categoryName == oldcat), newcat);
                        result1.board[catindex] = newcat;
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) console.log(err2);
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function updateAll(username,boardDetails)
{
	try{
        //authenticate user, then proceed
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
                        result1.board = boardDetails;
						console.log(result1);
                        db.collection("users").updateOne({username:username}, result1 ,function(err2, result2) {
                                if (err2) console.log(err2);
                                console.log("1 user updated");
                                db.close();
                        });
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function retrieveAll(username,cb)
{
	try{
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
						console.log(result1);
						cb(result1);
						db.close();
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function create(username,password)
{
	try{
        mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                var newuserobj = {username:username, password:password, board:[]};
                db.collection("users").insertOne(newuserobj, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user created");
                        db.close();
                });
        });
	} catch (err) {
		console.log(err);
	}
}

function auth(username,password,cb)
{
	try{
		mongoclient.connect(uri, function(err, db) {
                if (err) console.log(err);
                db.collection("users").findOne({username:username}, function(err1, result1) {
                        if (err1) console.log(err1);
                        console.log("1 user found");
						if(!result1){
							cb(null);
							db.close();
							return;
						}
                        if(result1.password == password)
                                cb(result1);
                        else
                                cb(null);
                        db.close();
                });
        });
	} catch (err) {
		console.log(err);
	}
}

var board = new boardObj();
var user = new userObj();

var mongotalk = { board:board, user:user };

module.exports = mongotalk;

//var newcat = {categoryName:"kittens",taskList:[]};
//addCategory("user1",newcat);

//removeCategory("user1","bunnies");

//updateCategory("user1","category1",newcat);

//user.create("cakes","cakescakes");
