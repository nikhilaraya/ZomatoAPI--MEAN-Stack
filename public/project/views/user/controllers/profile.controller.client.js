/**
 * Created by user on 09-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("profileController", profileController);

    function profileController($location,$routeParams,currentUser,userService) {

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
                    model.errorMsg = "You have not been logged out";
                });
        }
    }

})();