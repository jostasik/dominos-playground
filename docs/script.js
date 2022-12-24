const map = L.map('map',{scrollWheelZoom:false}).setView([-29.50, 145], 3.5);

const basemaps = { 
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',   {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
  Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?',   {layers: 'TOPO-WMS'}),
  Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'OSM-Overlay-WMS'})
};

L.control.layers(basemaps).addTo(map);

basemaps.StreetView.addTo(map);

const basicBeachIcon = L.icon({iconUrl: 'https://raw.githubusercontent.com/shacheeswadia/leaflet-map/main/beach-icon-colorful.svg', iconSize: [25, 25], // size of the icon
});


const marker1 = L.marker([-37.699450, 176.279420], {icon: basicBeachIcon})
            .bindPopup('Whitehaven Beach, Whitsunday Island')
            .addTo(map);
const marker2 = L.marker([-27.643310, 153.305140], {icon: basicBeachIcon})
  .bindPopup('Turquoise Bay Exmouth, Australia')
  .addTo(map);
const marker3 = L.marker([-33.956330, 122.150270], {icon: basicBeachIcon})
  .bindPopup('Cape Le Grand National Park Esperance, Australia')
  .addTo(map);
const marker4 = L.marker([-34.962390, 117.391220], {icon: basicBeachIcon})
  .bindPopup('Greens Pool Denmark, Australia')
  .addTo(map);
const marker5 = L.marker([-17.961210, 122.214820], {icon: basicBeachIcon})
  .bindPopup('Cable Beach Broome, Australia')
  .addTo(map);
const marker6 = L.marker([-16.505960, 151.751520], {icon: basicBeachIcon})
  .bindPopup('Matira Beach, Society Islands')
  .addTo(map);
const marker7 = L.marker([-22.594400, 167.484440], {icon: basicBeachIcon})
  .bindPopup('Piscine Naturelle Ile Des Pins, New Caledonia')
  .addTo(map);
const marker8 = L.marker([-37.977000, 177.057000], {icon: basicBeachIcon})
  .bindPopup('Ohope Beach Whakatane, New Zealand')
  .addTo(map);
const marker9 = L.marker([-41.037600, 173.017000], {icon: basicBeachIcon})
  .bindPopup('Kaiteriteri Beach, New Zealand')
  .addTo(map);
const marker10 = L.marker([-37.670300, 176.212000], {icon: basicBeachIcon})
  .bindPopup('Mt Maunganui Main Beach, New Zealand')
  .addTo(map);