'use strict';

app.service('csvDataService', function($http) {

    this.get = function(){
        return $http({
            method: 'GET',
            url: '/csv'
        }).then(function (response) {
            return response.data;
        })
    };
});
