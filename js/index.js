var map = L.map("map", { center: [40.116, -75.152], zoom: 7, scrollWheelZoom: true, tap: false })

var controlLayers = L.control.layers(null, null, { position: "topright", collapsed: false }).addTo(map)

var dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png")
controlLayers.addBaseLayer(dark, "Dark")
var light = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map)
controlLayers.addBaseLayer(light, "Light")
var street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
controlLayers.addBaseLayer(street, "Street")
var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}")
controlLayers.addBaseLayer(satellite, "Satellite")

var markerClusterGroup = L.markerClusterGroup({ maxClusterRadius: 70, showCoverageOnHover: true, zoomToBoundsOnClick: true }).addTo(map)

$.get("srv/latestStats.csv", function (csvString) {
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data

  var markerIcon = L.icon({ iconUrl: "images/marker.svg", iconSize: [32, 32], iconAnchor: [16, 16] })

  for (var i in data) {
    var row = data[i]

    const url = "https://dominos-backend.vercel.app/api/profile?storeId=" + row.StoreID

    const popupContent = "<em>Domino's #<b>" + row.StoreID + "</b></em><br>" + "<i> Franchisee: " + row.Franchisee + "</i></br>" + "Phone: " + row.Phone + "<br>" + "City: " + row.City + ", " + row.State

    var marker = L.marker([row.Latitude, row.Longitude], { opacity: 1, icon: markerIcon }).bindPopup(popupContent)

    markerClusterGroup.addLayer(marker)

    marker.on("click", function (e) {
      var popup = e.target.getPopup()
      $.getJSON(url).done(function (data) {
        var liveDetails =
          "<hr>" +
          'Open: <span style="text-transform:capitalize"><b>' +
          data.IsOpen +
          "</b></span><br>" +
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

map.attributionControl.setPrefix('developed by <a href="https://github.com/jostasik/dominos">@jostasik</a>')
