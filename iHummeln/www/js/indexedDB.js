$(document).ready(function () {
    console.log('indexedDB Javascript ready');
    initDB();
    testDB();
});

function initDB() {
    var request = window.indexedDB.open("iHummelDB", 3);
    request.onerror = function (event) {
        console.log("REQUEST ERROR!!!")
    };
    request.onsuccess = function (event) {
        console.log("REQUEST SUCCESS")
    };
}

function testDB() {
    const hummelData = [
        {
            bezeichnung: "Distelhummel",
            kurzinfo: "Testinfo Distelhummel"
        },
        {
            bezeichnung: "Bombus",
            kurzinfo: "Testinfo Bombus"
        },
    ];
    var db;
    const dbName = "iHummelDB";

    var request = indexedDB.open("iHummelDB");
    request.onerror = function (event) {
        alert("Warum haben Sie meiner Webapp nicht erlaubt IndexedDB zu verwenden?!");
    };
    request.onsuccess = function (event) {
        db = request.result;
        console.log(request.result)
    };
    // Dieses Event ist lediglich in modernen Browsern verfügbar
    request.onupgradeneeded = function (event) {
        var db = event.target.result;

        // Erstelle ein ObjectStore für diese Datenbank
        var objectStore = db.createObjectStore("hummeln", {
            keyPath: "bezeichnug"
        });

        // Speichert Werte 
        for (var i in hummeln) {
            objectStore.add(customerData[i]);
        }
    };

    var transaction = db.transaction(["hummeln"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("All done!");
    };
    transaction.onerror = function (event) {
        console.log("Transaction failed!");
    };
    
    var objectStore = transaction.objectStore("hummeln");
    for(var i in hummelData) {
        var request = objectStore.add(hummelData[i]);
        request.onsuccess = function(event) {
            console.log("request onsuccess")
        };
    }
}