var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', function () {
            ThreeDeeTouch.onHomeIconPressed = function (payload) {
                console.log("Icon pressed. Type: " + payload.type + ". Title: " + payload.title + ".");
                if (payload.type == 'add') {
                    window.location.href = '#NeueHummelBestimmen';
                } else if (payload.type == 'see') {
                    window.location.href = '#IdentifizierteHummeln';
                }
            }
            initStatusbarIos();
        }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function initStatusbarIos() {
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByHexString("#FFCC33");
    StatusBar.styleDefault();
}

function configureQuickActions() {
    ThreeDeeTouch.configureQuickActions([
                {
                    type: 'add', // optional, but can be used in the onHomeIconPressed callback
                    title: 'Hummel bestimmen', // mandatory
                    iconType: 'Add' // optional
    },
                {
                    type: 'see',
                    title: 'Bestimmte Hummeln',
                    iconType: 'Bookmark'
    }
  ]);
}

function initStatusbarIos() {
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByHexString("#FFCC33");
    StatusBar.styleDefault();
}
