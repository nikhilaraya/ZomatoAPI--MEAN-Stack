/**
 * Created by user on 17-08-2017.
 */
(function () {
    angular
        .module("Foood")
        .service("criticService", criticService);

    function criticService($http) {
        var model = this;

            model.createFinding = createFinding;
            model.findAllFindingsForUser = findAllFindingsForUser;
            model.findFindingById = findFindingById;
            model.updateFinding = updateFinding;
            model.deleteFinding = deleteFinding;
            model.findAllFindings = findAllFindings;

            function findAllFindings() {
                var url = "/api/findings";
                return $http.get(url).then(function (response) {
                    return response.data;
                })
            }

            function deleteFinding(findingId) {
                var url = "/api/finding/"+findingId;
                return $http.delete(url).then(function (response) {
                    return response.data;
                })
            }

            function updateFinding(findingId,newFinding) {
                var url ="/api/finding/"+findingId;
                return $http.put(url,newFinding).then(function (response) {
                    return response.data;
                })
            }

            function findFindingById(findingId) {
                var url ="/api/finding/"+findingId;
                return $http.get(url).then(function (response) {
                    return response.data;
                })
            }

            function findAllFindingsForUser(userId) {
                var url = "/api/critic/"+userId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

        function createFinding(criticFinding) {
            var url = "/api/critic/new";
            return $http.post(url,criticFinding)
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();