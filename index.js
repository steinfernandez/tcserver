const express = require('express')
const app = express()
const mongotalk = require('./js/mongotalk.js');

const SUCCESS_OBJ = true;
const FAILURE_OBJ = false;

app.get('/', function(req, res) {
    res.sendFile('default.html', { root: __dirname + "/www" } );
});

app.get('/main.js', function(req, res) {
    res.sendFile('main.js', { root: __dirname + "/www/js" } );
});

app.post('/addcategory', function (req, res) {
        try {
                mongotalk.board.addCategory(req.username,req.newcat);
                res.send(SUCCESS_OBJ)
        } catch(err) {
                res.send(FAILURE_OBJ)
        };
});

app.post('/removecategory', function (req, res) {
        try {
                mongotalk.board.removeCategory(req.username,req.delcat);
                res.send(SUCCESS_OBJ)
        } catch(err) {
                res.send(FAILURE_OBJ)
        };
});

app.post('/updatecategory', function (req, res) {
        try {
                mongotalk.board.updateCategory(req.username, req.oldcat, req.newcat);
                res.send(SUCCESS_OBJ)
        } catch(err) {
                res.send(FAILURE_OBJ)
        };
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
