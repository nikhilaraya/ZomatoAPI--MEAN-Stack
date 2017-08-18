/**
 * Created by user on 03-08-2017.
 */
var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('restaurantModel',restaurantSchema);
var userModel = require('../user/user.model.server');

module.exports = restaurantModel;

restaurantModel.addRatingAndReview = addRatingAndReview;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.createRestaurant = createRestaurant;
restaurantModel.getAllRestaurants = getAllRestaurants;
restaurantModel.deleteReview = deleteReview;
restaurantModel.deleteUserReview = deleteUserReview;

function deleteUserReview(userId) {
    return restaurantModel.update({},{$pull: {rateAndReview:{userId: userId}}},{multi:true});
}

function deleteReview(reviewId) {
    return restaurantModel.update({},{$pull: {rateAndReview:{_id: reviewId}}},{multi:true});
}

function getAllRestaurants() {
    return restaurantModel.find();
}

function createRestaurant(restObj) {
    return restaurantModel.create(restObj);
}
function findRestaurantById(restId) {
    return restaurantModel.find({restId: restId});
}

function addRatingAndReview(userId,rateAndReviewObj) {
    var rateAndReview = {
        userId : userId,
        rating : rateAndReviewObj.rating,
        review : rateAndReviewObj.review,
        username : rateAndReviewObj.username
    }
    return restaurantModel
        .update({restId: rateAndReviewObj.restId}, {$push: {rateAndReview: rateAndReview}});
}