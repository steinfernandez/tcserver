const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()
const session = require("express-session")
const bodyParser = require("body-parser")
const mongotalk = require('./js/mongotalk.js')

const SUCCESS_OBJ = true;
const FAILURE_OBJ = false;
const UNAUTH_OBJ = "bad cat you can't do that";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

passport.use(new LocalStrategy(
        function(username, password, done) {
                mongotalk.user.auth(username, password, function (user) {
                if (!user)
                        return done(null, false, { message: 'Authentication failed.' });
                else
                        return done(null, user);
                });
        }
));

app.use(express.static("public"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.post('/login',
        passport.authenticate('local'),
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send(req.user);
});

app.post('/addcategory', function (req, res) {
        if(!req.isAuthenticated())
                res.send(UNAUTH_OBJ)
        else
        {
                try {
                        mongotalk.board.addCategory(req.user.username,JSON.parse(req.body.newcat));
                        res.send(SUCCESS_OBJ)
                } catch(err) {
                        res.send(FAILURE_OBJ)
                };
        }
});

app.post('/removecategory', function (req, res) {
        if(!req.isAuthenticated())
                res.send(UNAUTH_OBJ)
        else
        {
                try {
                        mongotalk.board.removeCategory(req.user.username, req.body.catindex);
                        res.send(SUCCESS_OBJ)
                } catch(err) {
                        res.send(FAILURE_OBJ)
                };
        }
});

app.post('/updatecategory', function (req, res) {
        if(!req.isAuthenticated())
                res.send(UNAUTH_OBJ)
        else
        {
                try {
                        mongotalk.board.updateCategory(req.user.username, parseInt(req.body.catindex), JSON.parse(req.body.newcat));
                        res.send(SUCCESS_OBJ)
                } catch(err) {
                        res.send(FAILURE_OBJ)
                };
        }
});

app.post('/create', function (req, res) {
        try {
                mongotalk.user.create(req.body.username, req.body.password);
                res.send(SUCCESS_OBJ)
        } catch(err) {
                res.send(FAILURE_OBJ)
        };
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
