/**
 * Created by user on 11-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("userProfileController", userProfileController);
    
    function userProfileController($location,$routeParams,userService,loggedInUser) {
        var model = this;
        model.userId = $routeParams.userId;
        model.loggedInId = loggedInUser._id;
        model.followUser = followUser;
        model.unFollowUser = unFollowUser;

        function init() {
            userService.findUserById(model.userId).then(function (user) {
                model.user = user;
            })
            userService
                .isFollowingUser(model.loggedInId,model.userId)
                .then(function (followed) {
                    if(followed === 'true')
                    {
                        model.unFollow = false;
                    }
                    else {
                        model.unFollow = true;
                    }
                })
        }init();

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

    }
})();
