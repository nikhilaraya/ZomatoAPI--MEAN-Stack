/**
 * Created by user on 03-08-2017.
 */
var app = require('../../express');

var restaurantModel = require('../models/restaurant/restaurant.model.server');

app.put('/api/user/:userId/restaurant/:restId/rateAndReviewSubmit',addRatingAndReview);
app.get('/api/restaurant/:restId', findRestaurantById);
app.post('/api/restaurant',createRestaurant);
app.get('/api/restaurant/:restId/ratingAndReview',getRatingAndReviews);

function getRatingAndReviews(req,res) {
    var restId = req.params.restId;
    restaurantModel.getRatingAndReviews(restId).then(function (restaurant) {

    })
}

function createRestaurant(req,res) {
    var restObj = req.body;
    restaurantModel.createRestaurant(restObj).then(function (restaurant) {
        if(restaurant){
            res.json(restaurant);
        }
        else {
            res.json(null);
        }
    })
}

function findRestaurantById(req,res) {
    var restId = req.params.restId;
    restaurantModel.findRestaurantById(restId)
        .then(function (restaurant) {
        if(restaurant[0])
        {
            res.json(restaurant[0]);
        }
        else
        {
            res.json(null);
        }
    });
}
function addRatingAndReview(req,res) {
    var rateAndReviewObj = req.body;
    var userId = req.params.userId;
    restaurantModel
        .addRatingAndReview(userId,rateAndReviewObj).then(function (restaurant) {
        if(restaurant)
        {
            res.json('true');
        }
        else {
            res.json('false');
        }
    },function (error) {
        res.json(error);
    })
}