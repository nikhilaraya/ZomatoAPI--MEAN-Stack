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
            console.log("1");
            userService
                .login(username,password)
                .then(function (user) {
                    if(user!==null)
                    {
                        $location.url('/profile')
                    }
                    else
                    {
                        model.errorMsg = "sorry!"+username+" has not been registered!"
                    }
                });
        }


    }
})();