/**
 * Created by user on 09-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .service("userService", userService);

    function userService($http) {
        var api = {
            login: login,
            logout: logout,
            loggedin: loggedin,
            findUserByUsername: findUserByUsername,
            registerUser: registerUser,
            findUserById: findUserById,
            addToFavorites: addToFavorites,
            isFavoriteRestaurant: isFavoriteRestaurant,
            removeFavorite: removeFavorite,
            submitRatingAndReview : submitRatingAndReview
        }
        return api;

        function submitRatingAndReview(userId,rateReviewObj) {
            console.log("21");
            var url = "/api/user/"+userId+"/restaurant/"+rateReviewObj.restId+"/rateAndReview";
            return $http.put(url,rateReviewObj).then(function (response) {
                console.log("25");
                return response.data;
            })
        }

        function removeFavorite(userId,restId) {
            var url = "/api/user/"+userId+"/restaurant/"+restId+"/removeFavorite";
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function isFavoriteRestaurant(userId,restId) {
            var url = "/api/user/"+userId+"/restaurant/"+restId+"/isFavorite";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addToFavorites(userId,restId) {
            var url = "/api/user/"+userId+"/restaurant/"+restId+"/addToFavorites";
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                return response.data;
            })
        }
        function loggedin() {
            var url = "/api/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function registerUser(user) {
            var url = "/api/register";
            return $http.post(url,user)
                .then(function (response) {
                return response.data;
            })
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                return response.data;
            })
        }

    function logout() {
        var url = "/api/logout";
        return $http.post(url)
            .then(function (response) {
                return response.data;
            });
    }

    function login(username,password) {
        var url = "/api/login";
        var credentials = {
            username: username,
            password: password
        };
        return $http.post(url, credentials)
            .then(function (response) {
                return response.data;
            });
    }}
})();