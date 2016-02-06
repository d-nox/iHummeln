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
        templateUrl: 'pages/hummelBestimmen.html',
        controller: 'NeueHummelBestimmenController'
    })

    .when('/FunktionsweiseDerApp', {
        templateUrl: 'pages/funktionsweiseDerBestimmungsApp.html',
        controller: 'FunktionsweiseController'
    })

    .when('/NeueHummelBestimmen/Hintertibia', {
        templateUrl: 'pages/HummelBestimmen/hintertibia.html',
        controller: 'HintertibiaController'
    })

    .when('/NeueHummelBestimmen/Kopf', {
        templateUrl: 'pages/HummelBestimmen/kopf.html',
        controller: 'HummelKopfController'
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
    $('#mainContent').trigger('create');
});

iHummelnApp.controller('NeueHummelBestimmenController', function ($scope) {
    $scope.PageTitle = 'Neue Hummel bestimmen';
    $scope.Message = "this is the NeueHummelBestimmenController";
    $('#mainContent').trigger('create');
});

iHummelnApp.controller('FunktionsweiseController', function ($scope) {
    $scope.PageTitle = 'Funktionsweise der App';
    $scope.Message = "this is the FunktionsweiseController";
    $('#mainContent').trigger('create');
});

iHummelnApp.controller('HummelKopfController', function ($scope) {
    $scope.selectedHead = $scope.$id;
    $('#mainContent').trigger('create');
})

iHummelnApp.controller('HintertibiaController', function ($scope) {
    $scope.selectedHintertibiaController = $scope.$id;
    $('#mainContent').trigger('create');
})

iHummelnApp.controller('AllgemeinesController', function ($scope) {
    $scope.PageTitle = 'Allgemeines über Hummeln';
    $scope.Message = "this is the AllgemeinesController";
    $('#mainContent').trigger('create');
});;
