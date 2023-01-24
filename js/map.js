var map = L.map("map", {
  center: [37, -96],
  zoom: 5,
  minZoom: 4,
  maxZoom: 14,
  zoomSnap: 0.5,
  scrollWheelZoom: true,
  tap: false,
  maxBounds: [
    [2.826395, -151.609901],
    [61.108057, -39.461464],
  ],
})

var markerClusterGroup = L.markerClusterGroup({
  maxClusterRadius: 100,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  chunkedLoading: true,
}).addTo(map)

L.control
  .locate({
    position: "topleft",
    locateOptions: {
      flyTo: true,
      maxZoom: 12,
    },
  })
  .addTo(map)

var markerIcon = L.icon({ iconUrl: "images/marker.svg", iconSize: [32, 32], iconAnchor: [16, 16] })

var controlLayers = L.control.layers(null, null, { position: "topright", collapsed: false }).addTo(map)

var light = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
})
controlLayers.addBaseLayer(light, "Light")
var dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
})
controlLayers.addBaseLayer(dark, "Dark")
var street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)
controlLayers.addBaseLayer(street, "Street")

map.attributionControl.setPrefix('developed by <a href="https://github.com/jostasik/dominos" target="_blank">@jostasik</a>')
