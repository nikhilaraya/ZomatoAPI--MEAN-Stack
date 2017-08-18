/**
 * Created by user on 17-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("criticNewController", criticNewController);

    function criticNewController($scope,homeService,criticService,currentUser,$location,userService,$location) {
        var model = this;
        model.userId = currentUser._id;
        model.username = currentUser.username;
        model.searchBasedOnLocation = searchBasedOnLocation;
        model.submitFinding = submitFinding;
        model.logout = logout;
        $scope.details = {};

        function submitFinding(critic) {
            if(model.critic.restName === undefined||model.critic.finding === undefined)
            {

            }
            else {
                var criticFinding = {
                    userId: model.userId,
                    username: model.username,
                    restName: critic.restName,
                    finding: critic.finding
                }
                criticService
                    .createFinding(criticFinding)
                    .then(function (finding) {
                        if (finding) {
                            $location.url('/my-profile');
                        }
                        else {
                            model.message = 'could not submit your finding!'
                        }
                    })
            }
        }

        function searchBasedOnLocation() {
            console.log("hi");
            var latitude = $scope.details.geometry.location.lat();
            var longitude = $scope.details.geometry.location.lng();

            homeService
                .searchBasedOnLocation(latitude,longitude)
                .then(function (response) {
                resta = response.data.restaurants;
                var restaurants = [];
                for(var r in resta) {
                    restaurants.push(resta[r].restaurant);
                }
                model.resta = restaurants;
            });

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