// Set up initial map center and zoom level
var map = L.map('map', {
    center: [40.4140, -74.3520],
    // EDIT latitude, longitude to re-center map
    zoom: 12,
    // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
    scrollWheelZoom: false,
    tap: false
});

/* Control panel to display map layers */
var controlLayers = L.control.layers(null, null, {
    position: "topright",
    collapsed: false
}).addTo(map);

var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'}).addTo(map);

//'Store', 'IsOpen', 'Phone', 'City', 'Region', 'StoreAsOfTime', 'EstimatedWaitMinutes'


// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

// Read markers data from data.csv
$.get('srv/refreshData.csv', function(csvString) {var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    var markerIcon = L.icon({iconUrl: 'images/marker.svg', iconSize: [32, 32], iconAnchor: [16, 16]});

    for (var i in data) {
        var row = data[i];

        // Create a string with the contents of the pop-up window
        var popupContent = '<b> Domino\'s # ' + row.Store + '</b><br>' +
        '<i> Open: <b>' + row.IsOpen + '</b></i></br>' +
        'Phone: ' + row.Phone + '<br>' +
        'City: ' + row.City + ', ' + row.Region + '<br>' +
        'Estimated Wait Minutes: <b>' + row.EstimatedWaitMinutes + '</b><br>' +
        '(<i>as of: ' + row.StoreAsOfTime + ')</i>';

        // Create a marker and bind the pop-up window to it
        var marker = L.marker([row.Latitude, row.Longitude], {
            opacity: 1,
            icon: markerIcon
        }).bindPopup(popupContent);

    marker.addTo(map);
    }


});

map.attributionControl.setPrefix(
'developed by <a href="https://github.com/jostasik/dominos" target="_blank">@jostasik</a>'
);
