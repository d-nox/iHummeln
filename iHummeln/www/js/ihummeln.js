//--------------------------------------------------------------------------------------------------------------------------------------------------App
var iHummelApp = angular.module('iHummelApp', [
    'iHummelControllers'
]);
//-------------------------------------------------------------------------------------------------------------------------------------------Controller
var iHummelControllers = angular.module('iHummelControllers', []);

iHummelControllers.controller('mainController', ['$scope',
    function ($scope) {
        if (localStorage['hummeln'] !== undefined && localStorage['hummeln'] !== "" && localStorage['hummeln'] !== null) {
            $scope.hummeln = JSON.parse(localStorage['hummeln']);
        } else {
            $scope.hummeln = [];
        }

        $scope.delete = function (id) {
            var hummeln = JSON.parse(localStorage['hummeln']);
            var hummelnNew = [];
            for (i = 0; i < hummeln.length; i++) {
                if (hummeln[i].Id !== id) {
                    hummelnNew.push(hummeln[i]);
                }
            }
            localStorage['hummeln'] = JSON.stringify(hummelnNew);
            location.reload();
            navigator.vibrate(100);
        };

        $scope.add = function (id, name, path) {
            if (localStorage['hummeln'] === undefined || localStorage['idCount'] === undefined) {
                localStorage['idCount'] = 0;
                localStorage['hummeln'] = [];
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onFail, {
                enableHighAccuracy: true,
                timeout: 2 * 1000,
                maximumAge: 0
            });
            function onSuccess(pos) {
                var newHummel = {
                    Id: localStorage['idCount'] + "",
                    hummelId: id + "",
                    name: name + "",
                    picPath: path,
                    longitude: pos.coords.longitude + "",
                    latitude: pos.coords.latitude + "",
                    timestamp: new Date().getTime() + ""
                };
                if (localStorage['hummeln'] === null || localStorage['hummeln'].length === 0) {
                    var hummelnNew = [];
                    hummelnNew.push(newHummel);
                } else {
                    var hummelnNew = JSON.parse(localStorage['hummeln']);
                    hummelnNew.push(newHummel);
                }

                localStorage['hummeln'] = JSON.stringify(hummelnNew);
                localStorage['idCount'] = parseInt(localStorage['idCount']) + 1;
                window.location = "#";
                location.reload();
                navigator.vibrate(100);
            }

            function onFail(error) {
                if (error.code === 1) {
                    navigator.notification.confirm('Bitte aktivieren Sie in den Einstellungen die Ortungsdienste!', function(){}, ['Fehler'], ['Verstanden']);
                }
                else{
                    navigator.notification.confirm(error.code + ' - ' + error.message, function(){}, ['Fehler'], ['Verstanden']);
                }

                //alert(error.code + " - " + error.message);
            }
        };

        $scope.clearAll = function () {
            localStorage.clear();
            location.reload();
            navigator.vibrate(300);
        };
    }]);
