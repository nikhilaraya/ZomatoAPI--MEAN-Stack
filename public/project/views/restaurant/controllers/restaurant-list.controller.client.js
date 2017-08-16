/**
 * Created by user on 02-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($location,homeService,$routeParams,$scope) {
        var model = this;

        function init() {
            var latitude = $routeParams['latitude'];
            var longitude = $routeParams['longitude'];
            homeService.searchBasedOnLocation(latitude,longitude).then(function (response) {
                resta = response.data.restaurants;
                var restaurants = [];
                for(var r in resta) {
                    restaurants.push(resta[r].restaurant);
                }
                model.resta = restaurants;
            })
        }
        init();
    }
})();