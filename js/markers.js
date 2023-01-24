const url = "https://dominos-backend.vercel.app/api/profile?storeId="

var template = `
Domino's <b>{{storeId}}</b><br>
Franchisee: {{franchisee}}<br>
<span style='right'><i>City: {{city}}, {{region}}<br>
Phone: {{phone}}<hr>
Open: <span style='text-transform:capitalize'><b>{{isOpen}}</b><br>
Deliveries: <b>{{deliveryMin}}-{{deliveryMax}}</b> mins<br>
Carryouts: <b>{{carryoutMin}}-{{carryoutMax}}</b> mins<br>
<sub><i>as of: {{storeAsOfTime}}</i></sub>`

$.getJSON("data/info.json", function (data) {
  data.forEach(function (row) {
    var marker = L.marker([row.y, row.x], { opacity: 1, icon: markerIcon }).bindPopup("Loading...")
    markers.addLayer(marker)
    marker.on("click", function (e) {
      var popup = e.target.getPopup()
      $.getJSON(url + row.i).done(function (data) {
        var liveDetails = template
          .replace("{{storeId}}", row.i)
          .replace("{{franchisee}}", row.f)
          .replace("{{city}}", data.City)
          .replace("{{region}}", data.Region)
          .replace("{{phone}}", data.Phone)
          .replace("{{isOpen}}", data.IsOpen)
          .replace("{{deliveryMin}}", data.ServiceMethodEstimatedWaitMinutes.Delivery.Min)
          .replace("{{deliveryMax}}", data.ServiceMethodEstimatedWaitMinutes.Delivery.Max)
          .replace("{{carryoutMin}}", data.ServiceMethodEstimatedWaitMinutes.Carryout.Min)
          .replace("{{carryoutMax}}", data.ServiceMethodEstimatedWaitMinutes.Carryout.Max)
          .replace("{{storeAsOfTime}}", data.StoreAsOfTime)

        popup.setContent(liveDetails)
        popup.update()
      })
    })
  })
})
