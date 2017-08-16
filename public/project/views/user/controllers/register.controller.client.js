/**
 * Created by user on 03-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("registerController", registerController);

    function registerController($location,userService) {
        var model = this;
        model.register = register;

        function register(user) {
            userService
                .findUserByUsername(user.username)
                .then(function (userFound) {
                    if(userFound !== null) {
                        model.error = "Username already exists";
                    }
                    else {
                        var newUser ={
                            username : user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            password: user.password
                        }
                        console.log(newUser);
                        return userService
                            .registerUser(newUser)
                            .then(function (user) {
                            $location.url('/my-profile');
                        },function () {
                            model.message ="could not register";
                        })
                    }
                },function () {

                })
        }
    }
})();