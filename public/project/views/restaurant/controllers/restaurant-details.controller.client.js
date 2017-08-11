/**
 * Created by user on 03-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("restaurantDetailsController", restaurantDetailsController);

    function restaurantDetailsController($location,
                                         homeService,
                                         $routeParams,
                                         userService,
                                         loggedInUser,
                                         restaurantService) {
        var model = this;
        var restId = $routeParams.restId;
        model.userId = loggedInUser._id;
        model.addToFavorites = addToFavorites;
        model.removeFavorite = removeFavorite;
        model.submitRatingAndReview = submitRatingAndReview;

        function init() {
            homeService
                .getRestaurantDetails(restId)
                .then(function (response) {
                    model.restaurant = response.data;
            })
            userService
                .isFavoriteRestaurant(model.userId,restId)
                .then(function (liked) {
                    if(liked === 'true')
                    {
                        model.isNotFavorite = false;
                    }
                    else {
                        model.isNotFavorite = true;
                    }
                })
        }
        init();

        function submitRatingAndReview() {
            console.log("in controller begin");
            var rateReviewObj ={
                rating: model.rating,
                review: model.review,
                restId: restId,
                userId: model.userId
            }

            restaurantService.findRestaurantById(restId)
                .then(function (foundRestaurantId) {
                    console.log(foundRestaurantId);
                    if(foundRestaurantId !== null){
                        submitReviews(rateReviewObj);
                    }
                    else {
                        createRest(rateReviewObj);
                    }
                });

            // restaurantService
            //     .findRestaurantById(restId)
            //     .then(function (found) {
            //         if(found.name !== model.restaurant.name){
            //             var restObj ={
            //                 restId : restId,
            //                 name : model.restaurant.name,
            //                 imageUrl : model.restaurant.featured_image
            //             }
            //             console.log("8");
            //             restaurantService
            //                 .createRestaurant(restObj);
            //         }
            //     })
            // console.log("14");
            // restaurantService
            //     .submitRestaurantRatingAndReview(model.userId,rateReviewObj);
            // console.log("20");
            // userService
            //     .submitRatingAndReview(model.userId,rateReviewObj);
            // console.log("26");
        }


        function createRest(rateReviewObj) {
            var restObj ={
                restId : restId,
                name : model.restaurant.name,
                imageUrl : model.restaurant.featured_image
            }
            restaurantService
                .createRestaurant(restObj).then(function (restaurant) {
                if(restaurant.restId === restId){
                    submitReviews(rateReviewObj);
                }
            })
        }

        function submitReviews(rateReviewObj) {
            restaurantService
                .submitRestaurantRatingAndReview(model.userId,rateReviewObj);
            submitUserReviews(rateReviewObj);
        }

        function submitUserReviews(rateReviewObj) {
            userService
                .submitRatingAndReview(model.userId,rateReviewObj);
        }
        function addToFavorites() {
            userService
                .addToFavorites(model.userId,restId)
                .then(function () {
                   model.isNotFavorite = false;
                })
        }

        function removeFavorite() {
            userService
                .removeFavorite(model.userId,restId)
                .then(function () {
                    model.isNotFavorite = true;
                })
        }
    }
})();