(function () {
    angular
        .module("Foood")
        .controller("listFindingController", listFindingController);

    function listFindingController(currentUser,criticService) {
        var model = this;
        model.userId = currentUser._id;

        function init() {
            criticService
                .findAllFindingsForUser(model.userId)
                .then(function (findings) {
                    model.findings = findings;
                })
        }init();
    }
})();