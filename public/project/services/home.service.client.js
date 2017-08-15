/**
 * Created by user on 01-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .service("homeService", homeService);
    
    function homeService($http) {

        var model = this;

            model.searchBasedOnLocation = searchBasedOnLocation;
            model.getRestaurantDetails = getRestaurantDetails;
            model.getRestaurantReviewsFromApi = getRestaurantReviewsFromApi;

            function getRestaurantReviewsFromApi(restaurantId) {
                var url = 'https://developers.zomato.com/api/v2.1/reviews?res_id='+restaurantId+'&apikey=70812261f149b635898123ae618d05ca';
                return $http.get(url);
            }
        function getRestaurantDetails(restaurantId) {
            var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+restaurantId+'&apikey=70812261f149b635898123ae618d05ca';
            return $http.get(url);
        }

        function searchBasedOnLocation(latitude,longitude) {
            var url = 'https://developers.zomato.com/api/v2.1/search?lat='+latitude+'&lon='+longitude+'&count=10&apikey=70812261f149b635898123ae618d05ca';
            return $http.get(url);
        }
    }
})();