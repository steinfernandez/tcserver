const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.sendFile('default.html', { root: __dirname + "/www" } );
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
