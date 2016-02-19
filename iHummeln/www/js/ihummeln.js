//--------------------------------------------------------------------------------------------------------------------------------------------------App
var iHummelApp = angular.module('iHummelApp', [
    'iHummelControllers',
    'ngStorage'
]);
//-------------------------------------------------------------------------------------------------------------------------------------------Controller
var iHummelControllers = angular.module('iHummelControllers', []);

iHummelControllers.controller('mainController', ['$scope', '$window',
    function ($scope, $localStorage, $window) {
        if (localStorage['hummeln'] !== undefined) {
            $scope.hummeln = JSON.parse(localStorage['hummeln']);
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
        };

        $scope.add = function (id, name, path) {
            if (localStorage['hummeln'] === undefined || localStorage['idCount'] === undefined) {
                localStorage['idCount'] = 0;
                localStorage['hummeln'] = [];
            }
            var newHummel = {
                Id: localStorage['idCount'] + "",
                hummelId: id + "",
                name: name + "",
                picPath: path,
                longitude: "13.134134134",
                latitude: "23.214314143",
                timestamp: "134134134"
            };
            if (localStorage['hummeln'].length === 0) {
                var hummelnNew = [];
                hummelnNew.push(newHummel);
            } else {
                var hummelnNew = JSON.parse(localStorage['hummeln']);
                hummelnNew.push(newHummel);
            }

            localStorage['hummeln'] = JSON.stringify(hummelnNew);
            localStorage['idCount'] = parseInt(localStorage['idCount']) + 1;
            //window.location = '/';
            location.reload();
        };

        $scope.clearAll = function () {
            localStorage.clear();
            location.reload();
        };
    }]);
