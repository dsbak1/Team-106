// Default to Melbourne
var currentLat = -37.814107;
var currentLong = 144.96327999999994;
var formattedAddress = null;

var map = new google.maps.Map(
    document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: currentLat,
            lng: currentLong
        }
    }
);

// Reset the values to their defaults
// This should be called when the page is first opened
function reset() {
    currentLat = -37.814107;
    currentLong = 144.96327999999994;
    formattedAddress = null;
}
reset();

function search() {
    var markRef = null
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("locationInput").value;
    geocoder.geocode({
            'address': address
        },
        function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (markRef != null) {
                    markRef.setMap(null);
                }
                var geoLocation = results[0].geometry.location;
                map.setCenter(geoLocation)
                var marker = new google.maps.Marker({
                    map: map,
                    position: geoLocation
                });
                var annotation = new google.maps.InfoWindow({
                    content: results[0].formatted_address
                });
                annotation.open(map, marker)
                markRef = marker;
                currentLat = results[0].geometry.location.lat();
                currentLong = results[0].geometry.location.lng();
                formattedAddress = results[0].formatted_address;
            } else {
                // This isn't a valid location, so reset the page
                reset();
                window.alert("Couldn't find a matching location")
            }
        }
    );
}

function addLocation() {
    if (formattedAddress == null) {
        window.alert("You must enter a valid location before you can add it!")
        return;
    }

    var nickname = document.getElementById("nickname").value;
    if (nickname != "") {
        locationWeatherCache.addLocation(currentLat, currentLong, nickname)
    } else {
        locationWeatherCache.addLocation(currentLat, currentLong, formattedAddress)
    }

    // Inform user that location has been added
    window.alert("Location added")

    // Save the new location
    saveLocations();

    // Return to the main page
    window.location.href = "index.html"
}