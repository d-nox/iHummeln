//----------------------------------------------------------------------------------------------------------------------------------------App
var iHummelnApp = angular.module('iHummelnApp', ['ngRoute']);
//-------------------------------------------------------------------------------------------------------------------------------------Routes

iHummelnApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })

    .when('/NeueHummelBestimmen', {
        templateUrl: 'pages/HummelBestimmen/neueHummelBestimmen1.html',
        controller: 'NeueHummelBestimmenController'
    })

    .when('/FunktionsweiseDerApp', {
            templateUrl: 'pages/funktionsweiseDerBestimmungsApp.html',
            controller: 'FunktionsweiseController'
        })

    .when('/HummelKopf?=', {
        templateUrl: 'pages/HummelBestimmen/neueHummelBestimmen2.html',
        controller: 'HummelKopfController'
    })

    .when('/AllgemeinesUeberHummeln', {
        templateUrl: 'pages/allgemeinesUeberHummeln.html',
        controller: 'AllgemeinesController'
    });
});
//---------------------------------------------------------------------------------------------------------------------------------Controller
iHummelnApp.controller('mainController', function ($scope) {
    $scope.PageTitle = 'iHummeln';
    $scope.Message = "this is the mainController";
});

iHummelnApp.controller('NeueHummelBestimmenController', function ($scope) {
    $scope.PageTitle = 'Neue Hummel bestimmen';
    $scope.Message = "this is the NeueHummelBestimmenController";
});

iHummelnApp.controller('FunktionsweiseController', function ($scope) {
    $scope.PageTitle = 'Funktionsweise der App';
    $scope.Message = "this is the FunktionsweiseController";
});

iHummelnApp.controller('HummelKopfController', function ($scope) {
    $scope.selectedHead = $scope.$id;
})

iHummelnApp.controller('AllgemeinesController', function ($scope) {
    $scope.PageTitle = 'Allgemeines über Hummeln';
    $scope.Message = "this is the AllgemeinesController";
});;
