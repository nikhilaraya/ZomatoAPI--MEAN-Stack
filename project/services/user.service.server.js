/**
 * Created by user on 03-08-2017.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var bcrypt = require("bcrypt-nodejs");

app.post('/api/login',passport.authenticate('local'),login);
app.post('/api/logout', logout);
app.get('/api/user',findUserByCredentials);
app.post('/api/register',registerUser);
app.get('/api/loggedin', loggedin);
app.get('/api/user/:userId',findUserById);
app.put('/api/user/:userId/restaurant/:restId/addToFavorites',addToFavorites);
app.get('/api/user/:userId/restaurant/:restId/isFavorite',isFavoriteRestaurant);
app.put('/api/user/:userId/restaurant/:restId/removeFavorite',removeFavorite);
app.put('/api/user/:userId/restaurant/:restId/rateAndReview',rateAndReview);
app.put('/api/user/:userId/follow/:followId',followUser);
app.get('/api/user/:userId/follow/:followId',isFollowing);
app.get('/api/user/:userId/unfollow/:unfollowId',unFollowUser);
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
var FacebookStrategy = require('passport-facebook').Strategy;

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#!/profile',
        failureRedirect: '/#!/login'
    }));

var facebookConfig = {
    clientID     : '570649636657678',
    clientSecret : 'ebe2e1005a52b79155e84068c22a8abe',
    callbackURL  : 'http://localhost:3000/auth/facebook/callback'
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function unFollowUser(req,res) {
    var userId = req.params.userId;
    var unfollowId = req.params.unfollowId;
    userModel.unFollowUser(userId,unfollowId).then(function (userUpdated) {
        res.json(userUpdated);
    })
}

function isFollowing(req,res) {
    var userId = req.params.userId;
    var followId = req.params.followId;
    userModel.isFollowingUser(userId,followId).then(function (followed) {
        if(followed){
            res.json('true');
        }
        else{
            res.json('false');
        }
    });
}

function followUser(req,res) {
    var userId = req.params.userId;
    var followId = req.params.followId;
    userModel.followUser(userId,followId)
        .then(function (userUpdated) {
            res.json(userUpdated);
    })
}

function rateAndReview(req,res) {
    var rateReviewObj = req.body;
    userModel
        .addRateAndReview(rateReviewObj)
        .then(function (user) {
        if(user)
        {
            res.json('true');
        }
        else {
            res.json('false');
        }
    })
}

function removeFavorite(req,res) {
    var userId = req.params.userId;
    var restId = req.params.restId;
    userModel
        .removeFavorite(userId,restId)
        .then(function (unliked) {
            if(unliked)
            {
                res.json('true');
            }
            else
            {
                res.json('false');
            }
        });
}

function isFavoriteRestaurant(req,res) {
    var userId = req.params.userId;
    var restId = req.params.restId;
    userModel
        .isFavoriteRestaurant(userId,restId)
        .then(function (liked) {
           if(liked) {
               res.json('true');
           }
           else {
               res.send('false');
           }
        });
}

function addToFavorites(req,res) {
    var userId = req.params.userId;
    var restId = req.params.restId;
    userModel
        .addToFavorites(userId,restId)
        .then(function(userUpdated) {
            res.json(userUpdated);
        });
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}
function facebookStrategy(token,refreshToken,profile,done){
    userModel.findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user){
                return done(null,user);
            }
            else{
                var newUser = {
                    username: profile.displayName.replace(/ /g,""),
                    facebook:{
                        token:token,
                        id:profile.id
                    }
                };
                userModel
                    .createUser(newUser)
                    .then(function (user) {
                        return done(null,user);
                    },function (error) {
                        return done(error,null);
                    });
            }
        },function (error) {
            return done(error,null);
        });
}

function loggedin(req,res) {
    if(req.isAuthenticated()){
        res.json(req.user);
    }else
    {
        res.send('0');
    }
}

function registerUser(req,res) {
    var user = req.body;
    var password = req.body.password;
    req.body.password = bcrypt.hashSync(password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            });
        });
}

function findUserByCredentials(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            },function () {
                res.json(null);
            });
    }
    else if(username)
    {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else {
                    res.json(null);
                }
            },function () {
                res.json(null);
            });
    }
}

function logout(req,res) {
    req.logOut();
    res.send(200);
}

function login(req,res) {
    res.json(req.user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password,user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            },
            function(error) {
                done(error,false);
            }
        );
}
