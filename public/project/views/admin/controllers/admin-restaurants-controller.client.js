/**
 * Created by user on 12-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("adminRestaurantController", adminRestaurantController);

    function adminRestaurantController(restaurantService,userService,$location) {
        var model = this;
        model.deleteReview = deleteReview;
        model.logout = logout;

        function init() {
            findAllRestaurantReviews();
        }init();

        function findAllRestaurantReviews() {
            restaurantService
                .findAllRestaurants()
                .then(function (restaurants) {
                    model.restaurants = restaurants;
                    var displayReviews = [];
                    var allReviews;
                    for(var i in restaurants){
                        for(var j in restaurants[i].rateAndReview){
                            allReviews={
                                restName : restaurants[i].name,
                                username : restaurants[i].rateAndReview[j].id,
                                review : restaurants[i].rateAndReview[j].review,
                                rating : restaurants[i].rateAndReview[j].rating,
                                reviewId : restaurants[i].rateAndReview[j]._id
                            }
                            displayReviews.push(allReviews);
                        }
                    }
                    model.displayReviews = displayReviews;
                })
        }
        function deleteReview(reviewId) {
            restaurantService
                .deleteReview(reviewId)
                .then(function () {
                    model.message = "review deleted successfully";
                    findAllRestaurantReviews();
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