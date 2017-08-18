(function () {
    angular
        .module("Foood")
        .controller("listFindingController", listFindingController);

    function listFindingController(currentUser,criticService,$location,userService) {
        var model = this;
        model.userId = currentUser._id;
        model.logout = logout;

        function init() {
            criticService
                .findAllFindingsForUser(model.userId)
                .then(function (findings) {
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
    }
})();