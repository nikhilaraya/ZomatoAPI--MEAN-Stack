/**
 * Created by user on 09-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("profileController", profileController);

    function profileController($location,$routeParams,currentUser,userService,$scope,homeService) {

        var model = this;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {

            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                }, function (error) {
                    model.error = "User not found";
                });
        }

        init();

        model.searchBasedOnLocation = searchBasedOnLocation;
        $scope.details = {};

        function searchBasedOnLocation() {

            var latitude = $scope.details.geometry.location.lat();
            var longitude = $scope.details.geometry.location.lng();

            homeService.searchBasedOnLocation(latitude,longitude).then(function (response) {
                $location.url("/"+latitude+"/restaurant/"+longitude);
            })
        }

        function deleteUser() {
            console.log("inside"+model.userId);
            userService
                .deleteUser(model.userId)
                .then(function () {
                    $location.url("/");
                }, function () {
                    model.error = "Unable to unregister! Please try again";
                });
        }
        
        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(function () {
                    model.message = "Your details have been updated!";
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