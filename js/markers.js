fetch("./data/storeDetails.json")
  .then(function (response) {
    return response.json()
  })
  .then(function (obj) {
    for (var i in obj.s) {
      var row = obj.s[i]

      const url = "https://dominos-backend.vercel.app/api/profile?storeId=" + i

      const popupContent = "<b>Domino's #" + i + "<br>" + "Franchisee: " + row.o + "</b>"

      var markerLayer = L.marker([row.y, row.x], { opacity: 1, icon: markerIcon }).bindPopup(popupContent)

      markerClusterGroup.addLayer(markerLayer)

      markerLayer.on("click", function (e) {
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
