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
                                         loggedInUser) {
        var model = this;
        var restId = $routeParams.restId;
        model.userId = loggedInUser._id;
        model.addToFavorites = addToFavorites;
        model.removeFavorite = removeFavorite;

        function init() {
            homeService
                .getRestaurantDetails(restId)
                .then(function (response) {
                    model.restaurant = response.data;
            })
            userService
                .isFavoriteRestaurant(model.userId,restId)
                .then(function (liked) {
                    console.log(liked);
                    if(liked === 'true')
                    {
                        console.log("trueee");
                        model.isNotFavorite = false;
                    }
                    else {
                        console.log("falseee");
                        model.isNotFavorite = true;
                    }
                })
        }
        init();
        


        function addToFavorites() {
            console.log("like"+model.userId+" "+restId);
            userService
                .addToFavorites(model.userId,restId)
                .then(function () {
                   model.isNotFavorite = false;
                })
        }

        function removeFavorite() {
            console.log(model.userId);
            userService
                .removeFavorite(model.userId,restId)
                .then(function () {
                    model.isNotFavorite = true;
                })
        }
    }
})();