/**
 * Created by user on 12-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("adminRestaurantController", adminRestaurantController);

    function adminRestaurantController(restaurantService) {
        var model = this;
        model.deleteReview = deleteReview;

        function init() {
            findAllRestaurantReviews();
        }init();

        function findAllRestaurantReviews() {
            restaurantService
                .findAllRestaurants()
                .then(function (restaurants) {
                    console.log(restaurants[0].rateAndReview[0].review);
                    model.restaurants = restaurants;

                    var displayReviews = [];

                    for(var i in restaurants){
                        console.log("i entering");
                        for(var j in restaurants[i].rateAndReview){
                            console.log("j entering");
                            var allReviews={
                                restName : restaurants[i].name,
                                username : restaurants[i].rateAndReview[j].userId,
                                review : restaurants[i].rateAndReview[j].review,
                                rating : restaurants[i].rateAndReview[j].rating,
                                reviewId : restaurants[i].rateAndReview[j]._id
                            }
                            console.log(allReviews.restName);
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
    }

})();