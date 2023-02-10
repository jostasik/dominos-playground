var map = L.map("map", { center: [40.5, -77.5], zoom: 7, minZoom: 4, maxZoom: 16, preferCanvas: true, worldCopyJump: true })

var baseMaps = {
  Light: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(map),
  Dark: L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { attribution: "&copy; Carto Maptiles" }),
  Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"),
}

L.control.locate({ position: "topleft", locateOptions: { flyTo: true, maxZoom: 12 } }).addTo(map)

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map)

map.attributionControl.setPrefix('developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')

var overlayMaps = {
  "Domino's Stores": storeMarkerGroup,
  "Supply Chain Centers": sccMarker,
}
