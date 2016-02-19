//--------------------------------------------------------------------------------------------------------------------------------------------------App
var iHummelApp = angular.module('iHummelApp', [
    'iHummelControllers',
    'ngStorage'
]);
//-------------------------------------------------------------------------------------------------------------------------------------------Controller
var iHummelControllers = angular.module('iHummelControllers', []);

iHummelControllers.controller('mainController', ['$scope', '$localStorage',
    function ($scope, $localStorage) {
        $scope.hummeln = $localStorage.hummeln;

        $scope.delete = function (id) {
            var hummeln = $localStorage.hummeln;
            var hummelnNew = [];
            for (i = 0; i < hummeln.length; i++) {
                if (hummeln[i].Id !== id) {
                    hummelnNew.push(hummeln[i]);
                }
            }
            $localStorage.hummeln = hummelnNew;
            location.reload();
        };

        $scope.add = function (id, name, path) {
            if ($localStorage.hummeln === undefined || $localStorage.idCount === undefined) {
                $localStorage.idCount = 0;
                $localStorage.hummeln = [];
            }
            var newHummel = {
                Id: $localStorage.idCount+"",
                hummelId: id+"",
                name: name+"",
                picPath: path,
                longitude: "13.134134134",
                latitude: "23.214314143",
                timestamp: "134134134"
            };
            if ($localStorage.hummeln.length === 0) {
                var hummelnNew = [];
                hummelnNew.push(newHummel);
            } else {
                var hummelnNew = $localStorage.hummeln;
                hummelnNew.push(newHummel);
            }

            $localStorage.hummeln = hummelnNew;
            $localStorage.idCount++;
            location.reload();
            window.location = '/';
        };

        $scope.clearAll = function (){
            localStorage.clear();
            location.reload();
        };
    }]);
