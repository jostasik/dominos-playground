const markerIcon = L.icon({ iconUrl: "images/marker.svg", iconSize: [34, 34], iconAnchor: [16, 16] })

const supplyccIcon = L.icon({ iconUrl: "images/SupplyChainCenter.svg", iconSize: [32, 32], iconAnchor: [16, 16] })
const storeMarkerGroup = L.markerClusterGroup({ maxClusterRadius: 75 }).addTo(map)

$.get("data/stores.csv", function (csvString) {
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data

  for (var i in data) {
    var row = data[i]

    const url = "https://api.jostasik.com/api/profile?storeId=" + row.StoreID

    const popupContent = "<b>Domino's #" + row.StoreID + "<br>" + "Franchisee: " + row.Franchisee + "</b>"

    let storeMarker = L.marker([row.Latitude, row.Longitude], { opacity: 1, icon: markerIcon }).bindPopup("Loading...")

    storeMarkerGroup.addLayer(storeMarker)

    storeMarker.on("click", function (e) {
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

$.get("data/supplycc.csv", function (csvString) {
  var supplycc = Papa.parse(csvString, { header: true, dynamicTyping: true }).data

  for (var i in supplycc) {
    var row = supplycc[i]
    var sccMarker = L.marker([row.Latitude, row.Longitude], { opacity: 0.8, keyboard: false, icon: supplyccIcon, zIndexOffset: -10 })
    map.addLayer(sccMarker)
  }
})
