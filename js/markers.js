$.get("data/info.csv", function (csvString) {
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data

  for (var i in data) {
    var row = data[i]
    const url = "https://dominos-backend.vercel.app/api/profile?storeId=" + row.StoreID
    const popupContent = "<b>Domino's #" + row.StoreID + "<br>" + "Franchisee: " + row.Franchisee + "</b>"

    var marker = L.marker([row.Latitude, row.Longitude], { opacity: 1, icon: markerIcon }).bindPopup(popupContent)

    markerClusterGroup.addLayer(marker)

    marker.on("click", function (e) {
      var popup = e.target.getPopup()
      $.getJSON(url).done(function (data) {
        var liveDetails =
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
          "</b><sup>1</sup>" +
          "<br>" +
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
