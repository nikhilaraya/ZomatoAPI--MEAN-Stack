/**
 * Created by user on 11-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("userProfileController", userProfileController);
    
    function userProfileController($location,$routeParams,userService,loggedInUser,restaurantService,$scope,homeService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.loggedInId = loggedInUser._id;
        model.followUser = followUser;
        model.unFollowUser = unFollowUser;
        model.followsArray = [];
        model.favRestArray = [];
        model.logout = logout;

        function init() {
            userService.findUserById(model.userId).then(function (user) {
                model.user = user;
                getFollowDetails(user);
                getFavoriteDetails(user);
            });

            model.searchBasedOnLocation = searchBasedOnLocation;
            $scope.details = {};

            function searchBasedOnLocation() {

                var latitude = $scope.details.geometry.location.lat();
                var longitude = $scope.details.geometry.location.lng();

                homeService.searchBasedOnLocation(latitude,longitude).then(function (response) {
                    $location.url("/"+latitude+"/restaurant/"+longitude);
                })
            }

            userService
                .isFollowingUser(model.loggedInId,model.userId)
                .then(function (followed) {
                    if(followed === 'true')
                    {
                        console.log("dffffffffffffffff");
                        model.unFollow = false;
                    }
                    else {
                        console.log("dffffffffffffffffeeeeeeeeee");
                        model.unFollow = true;
                    }
                })
        }init();

        function getFollowDetails(user) {
            var followUsernames = [];
            for(var f in model.user.follows)
            {
                userService.findUserById(model.user.follows[f])
                    .then(function (user) {
                        if(user._id === loggedInUser._id)
                        {

                        }
                        else {
                            console.log(user.username);
                            var followDetails = {
                                username : user.username,
                                id : user._id
                            }
                            followUsernames.push(followDetails);
                        }
                    })
            }
            model.followsArray = followUsernames;
        }

        function getFavoriteDetails(user) {
            var favRestNames = [];
            for(var f in model.user.favorites)
            {
                restaurantService
                    .findRestaurantById(model.user.favorites[f])
                    .then(function (restaurant) {
                        console.log(restaurant.name);
                        var favRestDetails = {
                            name : restaurant.name,
                            id : restaurant.restId
                        }
                        favRestNames.push(favRestDetails);
                    })
            }
            model.favRestArray = favRestNames;
        }

        function followUser() {
            userService
                .followUser(model.loggedInId,model.userId).then(function () {
                model.unFollow = false;
            })
        }

        function unFollowUser() {
            userService
                .unFollowUser(model.loggedInId,model.userId).then(function () {
                model.unFollow = true;
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
