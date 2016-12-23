'use strict';

app.service('testDataService', function($http) {

    this.post = function(){
        return $http({
            method: 'POST',
            url: '/test',
            data: {
                test: "test"
            }
        }).then(function (response) {
            return response.data;
        })
    };
});
