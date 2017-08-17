/**
 * Created by user on 12-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("adminUserController", adminUserController);

    function adminUserController(userService,$location) {
        var model = this;
        model.createUser = createUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.displayUser = displayUser;
        model.logout = logout;

        function init() {
            findAllUsers();
        }init();

        function displayUser(userId) {
            userService.findUserById(userId).then(function (user) {
                console.log(user.username);
                model.user = user;
                model.displayParticularUser = true;

            });
        }

        function findAllUsers() {
            console.log("dfsdf");
            userService.findAllUsers().then(function (users) {
                model.users = users;
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

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    model.message = "user deleted successfully"
                    userService
                        .findAllUsers().then(function (users) {
                        model.users = users;
                    })
                })
        }

        function updateUser(userId,user) {
            console.log(userId+"   "+user.role+user.username);
            userService
                .updateUser(userId,user)
                .then(function (response) {
                    model.displayParticularUser = false;
                    model.message = "User updated Successfully";
                    userService
                        .findAllUsers()
                        .then(function (users) {
                            model.users = users;
                        });
                });
        }

        function createUser(username,password,role) {
            if (username === "" || password === "") {

            }
            else {
                var newUser = {
                    username: username,
                    password: password,
                    role: role
                }

                userService.registerUser(newUser).then(function (user) {
                    model.message = "user created successfully";
                    userService
                        .findAllUsers()
                        .then(function (users) {
                            model.users = users;
                        });
                })
            }
        }
    }

})();