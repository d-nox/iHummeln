//--------------------------------------------------------------------------------------------------------------------------------------------------App
var iHummelApp = angular.module('iHummelApp', [
    'iHummelControllers'
]);
//-------------------------------------------------------------------------------------------------------------------------------------------Controller
var iHummelControllers = angular.module('iHummelControllers', []);

var readyToUpload = false;

iHummelControllers.controller('mainController', ['$scope', '$http',
    function ($scope, $http) {
        document.addEventListener("online", uploadHummeln, false);
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
                maximumAge: 5000
            });

            function onSuccess(pos) {
                var newHummel = {
                    Id: localStorage['idCount'] + "",
                    hummelId: id + "",
                    name: name + "",
                    picPath: path,
                    longitude: pos.coords.longitude + "",
                    latitude: pos.coords.latitude + "",
                    timestamp: Date.now(),
                    locationString: 'Ort wird ermittelt....'
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
                window.plugins.toast.showShortBottom('Die Hummel, ' + newHummel.name + ', wurde erfolgreicht identifizert!');
            }

            function onFail(error) {
                if (error.code === 1) {
                    navigator.notification.confirm('Bitte aktivieren Sie in den Einstellungen die Ortungsdienste!', function () {}, 'Fehler', ['Verstanden']);
                } else {
                    navigator.notification.confirm(error.code + ' - ' + error.message, function () {}, 'Fehler', ['Verstanden']);
                }
            }
        };

        $scope.clearAll = function () {
            navigator.notification.confirm('Achtung, es werden alle Hummeln gelöscht!', deleteAllCallback, 'Alle Hummeln löschen?', ['Löschen', 'Nicht Löschen']);
        };

        function uploadHummeln() {
            if (localStorage['lastupload'] === undefined) {
                localStorage['lastupload'] = 0;
            }

            var hummeln = JSON.parse(localStorage['hummeln']);
            var i = 0;
            var counter = hummeln.length;
            while(i<hummeln.length){
                $http({
                            method: 'GET',
                            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + hummeln[i]['latitude'] + ',' + hummeln[i]['longitude'] +'&result_type=street_address&key=AIzaSyCzQSEM126iKL1tGXabjvmbqtRwYL1l_s8'
                        }).then(function successCallback(data) {
                            if (data['statusText'] === 'OK') {
                                hummeln[i-counter]['locationString'] = data.data.results[0].formatted_address;
                            } else {
                                hummeln[i-counter]['locationString'] = 'Keine Ortinformationen verfügbar!';
                            }
                    counter--;
                    if(counter == 0){
                        localStorage.hummeln = JSON.stringify(hummeln);
                    }
                        }, function errorCallback(data) {
                        });

                i++;
            }
            localStorage.hummeln = JSON.stringify(hummeln);
                var i = 0;
                while (i < hummeln.length) {
                    if (localStorage['lastupload'] < hummeln[i]['timestamp']) {
                        $http({
                            method: 'GET',
                            url: 'http://plusrein.at/dev/iHummeln/?hummelId=' + hummeln[i]['hummelId'] + '&longitude=' + hummeln[i]['longitude'] + '&latitude=' + hummeln[i]['latitude'] + '&timestamp=' + hummeln[i]['timestamp']
                        }).then(function successCallback(data) {
                            if (data['statusText'] === 'OK') {
                                localStorage['lastupload'] = hummeln[i - 1]['timestamp'];
                            } else {
                                alert(data['statusText'] + " - " + data['message']);
                            }
                        }, function errorCallback(data) {
                            alert('Es ist ein Fehler aufgetreten!');
                            return;
                        });
                    }
                    i++;
                }

        }

        $scope.Deteilansicht = function (hummel) {
            var hummeln = JSON.parse(hummelnJson);
            $scope.hummelName = hummeln['Hummeln'][hummel['hummelId'] - 1].name;
            $scope.picPath = hummeln['Hummeln'][hummel['hummelId'] - 1].picPath;
            $scope.beschreibung = hummeln['Hummeln'][hummel['hummelId'] - 1].beschreibung;
            showOpenStreetMap(hummel['latitude'], hummel['longitude']);
        };

        $scope.convertTimestampToLocalDateTime = function (timestamp) {
            return "Am " + new Date(timestamp).toLocaleDateString() + " um " + new Date(timestamp).toLocaleTimeString();
        };

        function showOpenStreetMap(lat, lng) {
            if (!OpenLayers) {
                console.log('Openlaysers not supported!');
            }
            var map;
            var zoom = 18;
            $('#mapOSM').text("");
            console.log(lng + " " + lat);
            map = new OpenLayers.Map("mapOSM");
            var mapnik = new OpenLayers.Layer.OSM();
            var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
            var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
            var position = new OpenLayers.LonLat(lng, lat).transform(fromProjection, toProjection);
            map.addLayer(mapnik);
            map.size.w = document.width * 0.9;
            map.setCenter(position, zoom);

            var markers = new OpenLayers.Layer.Markers("Markers");
            map.addLayer(markers);
            markers.addMarker(new OpenLayers.Marker(position));
        }

        function deleteAllCallback(buttonPressed) {
            if (buttonPressed === 1) {
                localStorage.clear();
                location.reload();
                navigator.vibrate(300);
                window.plugins.toast.showLongBottom('Alle identifizierten Hummeln wurden gelöscht!');
            }
        }

        function checkIfReadyToUpload($http) {
            var hummeln = JSON.parse(localStorage['hummeln']);

        }
}]);
