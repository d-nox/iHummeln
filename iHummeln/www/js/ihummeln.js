//--------------------------------------------------------------------------------------------------------------------------------------------------App
var iHummelApp = angular.module('iHummelApp', [
    'iHummelControllers'
]);
//-------------------------------------------------------------------------------------------------------------------------------------------Controller
var iHummelControllers = angular.module('iHummelControllers', []);

iHummelControllers.controller('mainController', ['$scope',
    function ($scope){
        console.log('Angular Loaded');
    }
])
