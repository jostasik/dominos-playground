const map = L.map("map", { center: [37, -96], zoom: 4, minZoom: 4, maxZoom: 16 })
map.attributionControl.setPrefix('developed by <a href="https://jostasik.com" target="_blank">Joe Stasik</a>')

const markerIcon = L.icon({ iconUrl: "images/marker.svg", iconSize: [32, 32], iconAnchor: [16, 16] })

const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}")

const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/attribution">Carto</a>',
})

const controlLayers = L.control.layers({ Street: street, Satellite: satellite, Dark: dark }).addTo(map)

L.control.locate({ position: "topleft", locateOptions: { flyTo: true, maxZoom: 12 } }).addTo(map)

$.get("data/stores.csv", function (csvString) {
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data

  for (var i in data) {
    var row = data[i]

    const url = "https://api.jostasik.com/api/profile?storeId=" + row.StoreID

    const popupContent = "<b>Domino's #" + row.StoreID + "<br>" + "Franchisee: " + row.Franchisee + "</b>"

    let marker = L.marker([row.Latitude, row.Longitude], { opacity: 1, icon: markerIcon }).bindPopup("Loading...")

    markerGroup.addLayer(marker)

    marker.on("click", function (e) {
      var popup = e.target.getPopup()
      $.getJSON(url).done(function (data) {
        const liveDetails =
          "<span style='right'><i>City: " +
          data.City +
          ", " +
          data.Region +
          "<br>" +
          "Phone: " +
          data.Phone +
          "<hr>" +
          "Open: <span style='text-transform:capitalize'><b>" +
          data.IsOpen +
          "</b><sup>1</sup><br>" +
          "Deliveries: <b>" +
          data.ServiceMethodEstimatedWaitMinutes.Delivery.Min +
          "-" +
          data.ServiceMethodEstimatedWaitMinutes.Delivery.Max +
          "</b> mins<sup>1</sup><br>" +
          "Carryouts: <b>" +
          data.ServiceMethodEstimatedWaitMinutes.Carryout.Min +
          "-" +
          data.ServiceMethodEstimatedWaitMinutes.Carryout.Max +
          "</b> mins<sup>1</sup><br>" +
          "<sub><sup>[1]</sup><i>as of: " +
          data.StoreAsOfTime +
          "</i></sub>"

        popup.setContent(popupContent + "<br>" + liveDetails)
        popup.update()
      })
    })
  }
})

const markerGroup = L.markerClusterGroup({ maxClusterRadius: 60 }).addTo(map)
