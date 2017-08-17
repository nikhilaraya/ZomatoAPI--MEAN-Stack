/**
 * Created by user on 17-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("adminCriticController", adminCriticController);

    function adminCriticController(criticService) {
        var model = this;
        model.deleteFinding = deleteFinding;
        model.logout = logout;

        function init() {
            criticService
                .findAllFindings().then(function (findings) {
                model.findings = findings;
            })
        }init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                },function () {
                    model.error = "You have not been logged out";
                });
        }

        function deleteFinding(findingId) {
            criticService
                .deleteFinding(findingId).then(function (status) {
                criticService
                    .findAllFindings().then(function (findings) {
                    model.findings = findings;
                })
            })
        }


    }

})();