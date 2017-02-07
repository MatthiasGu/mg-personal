/**
 * Created by mgudenas on 22/12/2016.
 */
app.controller('HomeController', function ($scope, csvDataService) {
    $scope.searchResults = {}
    $scope.getData = function() {
        csvDataService.get()
            .then(function (response) {
                $scope.searchResults = response;
                console.log(response);
            });
    };

});