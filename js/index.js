// Set up initial map center and zoom level
var map = L.map('map', {
    center: [40.4140, -74.3520],
    // EDIT latitude, longitude to re-center map
    zoom: 9.5,
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


// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

// Read markers data from data.csv
$.get('xhrs/data_nj.csv', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true
    }).data;

    var markerIcon = L.icon({
        iconUrl: 'images/marker.svg',
        iconSize: [32, 32],
        // size of the icon
        iconAnchor: [16, 16] // point of the icon which will correspond to marker's location
    });

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
        var row = data[i];

        // Create a string with the contents of the pop-up window
        var popupContent = '<b> Domino\'s Store: ' + row.Title + '</b><br>' +
        'Wait Time: ' + row.ETA + ' mins<br>' +
        'Franchisee: ' + row.Franchisee + '<br>' +
        'Store Phone: ' + row.Phone;

        // Create a marker and bind the pop-up window to it
        var marker = L.marker([row.Latitude, row.Longitude], {
            opacity: 1,
            icon: markerIcon
        }).bindPopup(popupContent);

        // Set up the marker click event handler
        marker.on('click', function() {
            // Send a GET request to the server
            fetch('https://order.dominos.com/power/store/' + row.Title + '/profile', {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Update the ETA value
                row.ETA = data.EstimatedWaitMinutes;

                // Update the marker pop-up window
               
            });
            marker.bindPopup('<b> Domino\'s Store: ' + row.Title + '</b><br>' +
                'Wait Time: ' + row.ETA + ' mins<br>' +
                'Franchisee: ' + row.Franchisee + '<br>' +
                'Store Phone: ' + row.Phone + '<br>' +
                'As Of: ' + row.UpdateTime);
        });

        marker.addTo(map);
    }


});

map.attributionControl.setPrefix(
'developed by <a href="https://github.com/jostasik/dominos" target="_blank">@jostasik</a>'
);
