/**
 * Created by user on 02-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($location,homeService,$routeParams,$scope) {
        var model = this;

        model.searchBasedOnLocation = searchBasedOnLocation;
        $scope.details = {};

        function searchBasedOnLocation() {

            var latitude = $scope.details.geometry.location.lat();
            var longitude = $scope.details.geometry.location.lng();

            homeService.searchBasedOnLocation(latitude,longitude).then(function (response) {
                $location.url("/"+latitude+"/restaurant/"+longitude);
            })
        }

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