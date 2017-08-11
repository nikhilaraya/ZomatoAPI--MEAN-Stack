/**
 * Created by user on 10-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .service("restaurantService", restaurantService);

    function restaurantService($http) {
        var api = {
            submitRestaurantRatingAndReview: submitRestaurantRatingAndReview,
            findRestaurantById : findRestaurantById,
            createRestaurant : createRestaurant
        }
        return api;

        function createRestaurant(restObj) {
            var url = "/api/restaurant";
            console.log("9");
            return $http.post(url,restObj)
                .then(function (response) {
                    console.log("13");
                    return response.data;
                })
        }

        function findRestaurantById(restId) {
            var url = "/api/restaurant/"+restId;
            return $http.get(url)
                .then(function (response) {
                return response.data;
            })
        }
        function submitRestaurantRatingAndReview(userId,rateReviewObj) {
            var url = "/api/user/"+userId+"/restaurant/"+rateReviewObj.restId+"/rateAndReviewSubmit";
            return $http.put(url,rateReviewObj)
                .then(function (response) {
                return response.data;
            })
        }
    }

})();