/**
 * Created by user on 01-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "views/home/templates/home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when("/login",{
                templateUrl:'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl:'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/profile",{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/search/:basedLocation",{
                templateUrl:'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when("/:latitude/restaurant/:longitude",{
                templateUrl:'views/restaurant/templates/restaurant-list.view.client.html',
                controller: 'restaurantListController',
                controllerAs: 'model'
            })
            .when("/restaurant/:restId",{
                templateUrl:'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'restaurantDetailsController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser : loggedInUser
                }
            })
    }

    function loggedInUser(userService,$q,$location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});
                }
                else
                {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    function checkLoggedIn(userService,$q,$location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url('/login');
                }
                else
                {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();
