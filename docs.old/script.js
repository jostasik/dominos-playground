const map = L.map('map',{scrollWheelZoom:false}).setView([41.15, -96.50], 5);

const basemaps = { 
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',   {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
  Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?',   {layers: 'TOPO-WMS'}),
  Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'OSM-Overlay-WMS'})
};

L.control.layers(basemaps).addTo(map);

basemaps.StreetView.addTo(map);

const dIcon = L.icon({iconUrl: 'https://raw.githubusercontent.com/jostasik/domiknows/main/docs/c3d68a9df8970596b85806579fe0ff96.svg', iconSize: [25, 25], // size of the icon
});


const marker1 = L.marker([-37.699450, 176.279420], {icon: dIcon})
            .bindPopup('Whitehaven Beach, Whitsunday Island')
            .addTo(map);
const marker2 = L.marker([-27.643310, 153.305140], {icon: dIcon})
  .bindPopup('Turquoise Bay Exmouth, Australia')
  .addTo(map);
const marker3 = L.marker([-33.956330, 122.150270], {icon: dIcon})
  .bindPopup('Cape Le Grand National Park Esperance, Australia')
  .addTo(map);
const marker4 = L.marker([-34.962390, 117.391220], {icon: dIcon})
  .bindPopup('Greens Pool Denmark, Australia')
  .addTo(map);
const marker5 = L.marker([-17.961210, 122.214820], {icon: dIcon})
  .bindPopup('Cable Beach Broome, Australia')
  .addTo(map);
const marker6 = L.marker([-16.505960, 151.751520], {icon: dIcon})
  .bindPopup('Matira Beach, Society Islands')
  .addTo(map);
const marker7 = L.marker([-22.594400, 167.484440], {icon: dIcon})
  .bindPopup('Piscine Naturelle Ile Des Pins, New Caledonia')
  .addTo(map);
const marker8 = L.marker([-37.977000, 177.057000], {icon: dIcon})
  .bindPopup('Ohope Beach Whakatane, New Zealand')
  .addTo(map);
const marker9 = L.marker([-41.037600, 173.017000], {icon: dIcon})
  .bindPopup('Kaiteriteri Beach, New Zealand')
  .addTo(map);
const marker10 = L.marker([-37.670300, 176.212000], {icon: dIcon})
  .bindPopup('Mt Maunganui Main Beach, New Zealand')
  .addTo(map);
