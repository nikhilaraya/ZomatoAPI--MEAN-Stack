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
        var restaurantRatingAndReviews = [];
        model.logout = logout;
        model.showReview = true;

        function init() {
            homeService
                .getRestaurantDetails(restId)
                .then(function (response) {
                    model.restaurant = response.data;
            });

            homeService
                .getRestaurantReviewsFromApi(restId)
                .then(function (response) {
                    console.log(response.data);
                    model.restaurantApiReviews = response.data.user_reviews;
                    console.log(response.data.user_reviews);
                });

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
                });
            displayRestaurantReviews();
        }
        init();

        function displayRestaurantReviews() {
            console.log("in display");
            restaurantService
                .findRestaurantById(restId)
                .then(function (found) {
                    model.rateReviews = found.rateAndReview;
                });
        }

        // userService
        //     .findUserById(model.userId)
        //     .then(function (user) {
        //         for(var f in user.followers) {
        //             userService
        //                 .findUserById(user.followers[f])
        //                 .then(function (user) {
        //                     followers.push(user);
        //                 });
        //         }
        //     });
        // model.followers = followers;


        function submitRatingAndReview() {
            console.log("in controller begin");
            var rateReviewObj ={
                rating: model.rating,
                review: model.review,
                restId: restId,
                userId: model.userId,
                username: loggedInUser.username,
                restname : model.restaurant.name
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
            displayRestaurantReviews();
        }
        function addToFavorites() {
            userService
                .addToFavorites(model.userId,restId,model.restaurant.name)
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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                },function () {
                    model.error = "You have not been logged out";
                });
        }
    }
})();