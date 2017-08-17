/**
 * Created by user on 03-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("loginController", loginController);
    
    function loginController($location,userService) {
        var model = this;

        function init() {

        }
        init();

        model.login = login;
        function login(username,password) {
            userService
                .login(username,password)
                .then(function (user) {
                    if(user!==null)
                    {
                        $location.url('/my-profile')
                    }
                    else
                    {
                        model.message = "sorry!"+username+" has not been registered!"
                    }
                },function () {
                    model.message = "sorry! couldnt login";
                });
        }


    }
})();