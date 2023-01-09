// Set up initial map center and zoom level
var map = L.map('map', {
    center: [39.8283, -98.5795],
    // EDIT latitude, longitude to re-center map
    zoom: 5,
    // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
    scrollWheelZoom: true,
    tap: false

});

/* Control panel to display map layers */
var controlLayers = L.control.layers(null, null, {
    position: "topright",
    collapsed: false
}).addTo(map);

var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png');
controlLayers.addBaseLayer(dark, 'Dark');
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>, &copy; <a href="https://carto.com/attribution"></a>' });
controlLayers.addBaseLayer(light, 'Light');
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
controlLayers.addBaseLayer(street, 'Street')
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'});
controlLayers.addBaseLayer(satellite, 'Satellite')


//'Store', 'IsOpen', 'Phone', 'City', 'Region', 'StoreAsOfTime', 'EstimatedWaitMinutes'

var markerClusterGroup = L.markerClusterGroup({
	maxClusterRadius: 70,
    // disableClusteringAtZoom: 11,
	showCoverageOnHover: true,
	zoomToBoundsOnClick: true,

}).addTo(map);


// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

// Read markers data from data.csv
$.get('srv/latestStats.csv', function(csvString) {
    var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

    var markerIcon = L.icon({ iconUrl: 'images/marker.svg', iconSize: [32, 32], iconAnchor: [16, 16] });

    for (var i in data) {
        var row = data[i]; 

        const url = 'https://dominos-backend.vercel.app/api/profile?storeId=' + row.StoreID;
                
        // Create a string with the contents of the pop-up window
        const popupContent = '<em>Domino\'s #<b>' + row.StoreID + '</b></em><br>'+
            '<i> Franchisee: ' + row.Franchisee + '</i></br>' +
            'Phone: ' + row.Phone + '<br>' +
            'City: ' + row.City + ', ' + row.State;

        // Create a marker and bind the pop-up window to it
        var marker = L.marker([row.Latitude, row.Longitude], {opacity: 1, icon: markerIcon}).bindPopup(popupContent);

        markerClusterGroup.addLayer(marker);


        marker.on('click', function(e) {
            var popup = e.target.getPopup();
            $.getJSON(url).done(function(data) {
                var liveDetails = '<hr>' +
                    'Open: <span style="text-transform:capitalize"><b>' + data.IsOpen + '</b></span><br>' +
                    'Deliveries: <b>' + data.ServiceMethodEstimatedWaitMinutes.Delivery.Min + '-' + data.ServiceMethodEstimatedWaitMinutes.Delivery.Max + '</b> mins<sup>1</sup><br>' +
                    'Carryouts: <b>' + data.ServiceMethodEstimatedWaitMinutes.Carryout.Min + '-' + data.ServiceMethodEstimatedWaitMinutes.Carryout.Max + '</b> mins<sup>1</sup><br>' +
                    '<sub><sup>[1]</sup><i>as of: ' + data.StoreAsOfTime + '</i></sub>';
                popup.setContent(popupContent + '<br>' + liveDetails);
                popup.update();
            })
        })
    };
})
    



    


map.attributionControl.setPrefix(
    'developed by <a href="https://github.com/jostasik/dominos" target="_blank">@jostasik</a>'
);