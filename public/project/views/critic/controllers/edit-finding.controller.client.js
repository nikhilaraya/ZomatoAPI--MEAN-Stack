/**
 * Created by user on 17-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .controller("editFindingController", editFindingController);

    function editFindingController($routeParams,criticService,currentUser,$location) {

        var model = this;
        var findingId = $routeParams.findingId;
        model.updateFinding = updateFinding;
        model.deleteFinding = deleteFinding;

        function init() {
            criticService
                .findFindingById(findingId)
                .then(function (finding) {
                    model.finding = finding;
                })
        }init();

        function updateFinding() {
            var newFinding = {
                userId : currentUser._id,
                username : currentUser.username,
                restName : model.finding.restName,
                finding : model.finding.finding
            }
            criticService
                .updateFinding(findingId,newFinding).then(function (status) {
                $location.url('/critic/'+currentUser._id);
            })
        }

        function deleteFinding() {
            criticService
                .deleteFinding(findingId).then(function (status) {
                $location.url('/critic/'+currentUser._id);
            })
        }
    }

})();