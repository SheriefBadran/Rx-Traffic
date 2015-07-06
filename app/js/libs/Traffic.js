/**
 * Created by sheriefbadran on 12/4/14.
 * The name of the global namespace object is TRAFFIC
 */

var TRAFFIC = TRAFFIC || {};

TRAFFIC.namespace = function(ns_string)
{
    var parts = ns_string.split('.'),
        parent = TRAFFIC,
        i;

    if(parts[0] === "TRAFFIC")
    {
        parts = parts.slice(1);
    }

    for(i=0; i<parts.length; i+=1)
    {
        if(typeof parent[parts[i]] === "undefined")
        {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

TRAFFIC.namespace('google.map');
TRAFFIC.namespace('google.mapMarker');
TRAFFIC.namespace('trafficEvent');

TRAFFIC.google.map = (function () {

    // private property
    var map;

    // private methods
    function displayMap (centerCoordinate, mapOptions, mapWrapper) {

        console.log(centerCoordinate);
        // var accuracy = pos.coords.accuracy;
        var latlng = new google.maps.LatLng(centerCoordinate.latitude, centerCoordinate.longitude);
        map = new google.maps.Map(mapWrapper, mapOptions);
    };

    // public API
    return {
        displayGoogleMap: function (centerCoordinate, mapOptions, mapWrapper) {
            console.log(centerCoordinate);
            displayMap(centerCoordinate, mapOptions, mapWrapper);
        },
        getMap: function () {

            return (map instanceof google.maps.Map) ? map : null
        }
    };
}());

TRAFFIC.google.mapMarker = (function () {

    // private methods
    function createMarkers () {

    };

    function getRelevantArray () {

    };

    function arrangeData () {

    };

    function populateCategoryArrays () {

    };

    // Public API
    return {
        markers: [],
        roadData: [],
        publicTransData: [],
        disruptionData: [],
        other: [],
        markerData: [],
        trafficMessageList: document.querySelector('#traffic-message-list'),
        createMarkers: function (markerData) {


        },
        getRelevantArray: function () {


        },
        arrangeData: function () {


        },
        populateCategoryArrays: function () {


        }
    };
}());

TRAFFIC.google.map = (function () {

    // private property
    var map;

    // private methods
    function displayMap (centerCoordinate, mapOptions, mapWrapper) {

        // var accuracy = pos.coords.accuracy;
        var latlng = new google.maps.LatLng(centerCoordinate.latitude, centerCoordinate.longitude);
        map = new google.maps.Map(mapWrapper, mapOptions);
    };

    // public API
    return {
        displayGoogleMap: function (centerCoordinate, mapOptions, mapWrapper) {

            displayMap(centerCoordinate, mapOptions, mapWrapper);
        },
        getMap: function () {

            return (map instanceof google.maps.Map) ? map : null
        }
    };
}());

TRAFFIC.trafficEvent = (function () {

    // Dependencies
    var mapHandler = TRAFFIC.google.map;
    var mapMarker = TRAFFIC.google.marker;

}());