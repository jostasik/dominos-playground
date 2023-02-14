const url = "https://api.jostasik.com/api/profile?storeId="

storeData.forEach(function (id) {
  var popupContent = `Domino's <b>${id.a}</b><br>Franchisee: ${id.e}<br>`
  var marker = L.marker([id.b, id.c], {opacity: 1, icon: storeIcon}).bindPopup(popupContent)
  marker.on("click", function (e) {
    var popup = e.target.getPopup()
    $.getJSON(url + id.a).done(function (api) {
      var liveDetails = `<span style='right'><i>City: ${api.City}, ${api.Region}<br>Phone: ${api.Phone}<hr>
                          Open: <span style='text-transform:capitalize'><b>${api.IsOpen}</b><br>
                          Deliveries: <b>${api.ServiceMethodEstimatedWaitMinutes.Delivery.Min}-${api.ServiceMethodEstimatedWaitMinutes.Delivery.Max}</b> mins<br>
                          Carryouts: <b>${api.ServiceMethodEstimatedWaitMinutes.Carryout.Min}-${api.ServiceMethodEstimatedWaitMinutes.Carryout.Max}</b> mins<br>
                          <sub><i>as of: ${api.StoreAsOfTime}</i></sub>`

      popup.setContent(`${popupContent}<br>${liveDetails}`)
      popup.update()
    })
  })
  storeMarkers.addLayer(marker)
})

supplyData.forEach(function (id) {
  var marker = L.marker([id.Latitude, id.Longitude], {opacity: 1, zIndexOffset: -1000, icon: supplyIcon})
    .bindPopup(
      `Supply Chain Center #${id.ID}<hr>
                ${id.Street},<br>${id.City}, ${id.State}<br>${id.Zip}`
    )
    .addTo(map)
})
