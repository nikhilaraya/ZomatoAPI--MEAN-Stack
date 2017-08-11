/**
 * Created by user on 03-08-2017.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel',userSchema);

userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.createUser = createUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.addToFavorites = addToFavorites;
userModel.isFavoriteRestaurant = isFavoriteRestaurant;
userModel.removeFavorite = removeFavorite;
userModel.addRateAndReview = addRateAndReview;
userModel.followUser = followUser;
userModel.isFollowingUser = isFollowingUser;
userModel.unFollowUser = unFollowUser;

module.exports = userModel;

function unFollowUser(userId, unfollowId) {
    return userModel.update({_id: userId},{$pullAll:{follows: [unfollowId]}});
}

function isFollowingUser(userId,followId) {
    return userModel.findOne({_id:userId,follows: {$in: [followId]}});
}

function followUser(userId,followId) {
    return userModel.update({_id: userId}, {$push:{follows: followId}});
}

function addRateAndReview(rateReviewObj) {
    console.log("23");
    var rateReview ={
        restId : rateReviewObj.restId,
        rating : rateReviewObj.rating,
        review : rateReviewObj.review
    }
    return userModel
        .update({_id: rateReviewObj.userId}, {$push: {rateAndReviewRestaurant: rateReview}});
}

function removeFavorite(userId,restId) {
    return userModel.update({_id: userId},{$pullAll:{favorites: [restId]}});
}

function isFavoriteRestaurant(userId,restId) {
    return userModel.findOne({_id:userId,favorites: {$in: [restId]}});
}
function addToFavorites(userId,restId) {
    return userModel.update({_id: userId}, {$push:{favorites: restId}});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function createUser(user) {
    return userModel.create(user);
}
function findUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:password});
}
function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}