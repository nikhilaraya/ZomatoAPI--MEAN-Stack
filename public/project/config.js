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
                controllerAs: 'model',
                resolve: {
                    loggedInUser : loggedInUser
                }
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
            .when("/my-profile",{
                templateUrl:'views/user/templates/my-profile.view.client.html',
                controller: 'myProfileController',
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
                controllerAs: 'model',
                resolve: {
                    loggedInUser : loggedInUser
                }
            })
            .when("/restaurant/:restId",{
                templateUrl:'views/restaurant/templates/restaurant-details.view.client.html',
                controller: 'restaurantDetailsController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser : loggedInUser
                }
            })
            .when("/user/:userId",{
                templateUrl:'views/user/templates/user-profile.view.client.html',
                controller: 'userProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedInUser : loggedInUser
                }
            })
            .when("/admin/users",{
                templateUrl:'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/admin",{
                templateUrl:'views/admin/templates/admin-options.view.client.html'
            })
            .when("/admin/restaurants",{
                templateUrl:'views/admin/templates/admin-restaurants.view.client.html',
                controller: 'adminRestaurantController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/admin/critics",{
                templateUrl:'views/admin/templates/admin-critics.view.client.html',
                controller: 'adminCriticController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/critic",{
                templateUrl:'views/critic/templates/new-finding.view.client.html',
                controller: 'criticNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/critic/:criticId",{
                templateUrl:'views/critic/templates/list-finding.view.client.html',
                controller: 'listFindingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/critic/:findingId/edit",{
                templateUrl:'views/critic/templates/edit-finding.view.client.html',
                controller: 'editFindingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
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
