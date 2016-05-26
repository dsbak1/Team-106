loadLocations();
var geocoder = new google.maps.Geocoder();

var markRef = null

var currentLat, currentLong, formattedAdd;

    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}
  });


function search()
{
    var address = document.getElementById("locationInput").value;
    geocoder.geocode({'address':address},
    function(results,status){
        if (status===google.maps.GeocoderStatus.OK)
            {
                if (markRef != null){
                    markRef.setMap(null);
                }
                var geoLocation = results[0].geometry.location
                map.setCenter(geoLocation)
                var marker = new google.maps.Marker({
                    map: map,
                    position: geoLocation
                })
                var annotation = new google.maps.InfoWindow({
                    content: results[0].formatted_address
                })
                annotation.open(map,marker)
                markRef = marker;
                currentLat = results[0].geometry.location.lat();
                currentLong = results[0].geometry.location.lng();
                formattedAdd = results[0].formatted_address;
                
            
            }
    })
}

function addLocation()
{
    var nickName = document.getElementById("nickName").value;
    if (nickName != "")
        {
            locationWeatherCache.addLocation(currentLat, currentLong, nickName)
        }
    else
        {
            locationWeatherCache.addLocation(currentLat, currentLong, formattedAdd)
        }
window.location.href = "index.html"
return false
}
            

    
    