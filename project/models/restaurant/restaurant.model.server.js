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
restaurantModel.getRatingAndReviews = getRatingAndReviews;

function getRatingAndReviews(restId) {
    //return restaurantModel.find
}

function createRestaurant(restObj) {
    console.log("11");
    return restaurantModel.create(restObj);
}
function findRestaurantById(restId) {
    console.log("4"+restId);
    return restaurantModel.find({restId: restId});
}

function addRatingAndReview(userId,rateAndReviewObj) {
    console.log("17");
    var rateAndReview = {
        userId : userId,
        rating : rateAndReviewObj.rating,
        review : rateAndReviewObj.review
    }
    return restaurantModel
        .update({restId: rateAndReviewObj.restId}, {$push: {rateAndReview: rateAndReview}});
}