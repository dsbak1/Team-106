/*
* Title: mainPage.js
* Purpose: To dynamically display saved location data on index.html
* Organization/Team: 106
* Authors: David Baker
* Last Modified: 29th April 2016
* Version: 1.0.0
*/

function viewLocation(locationIndex) {
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationIndex);
    // And load the view location page.
    location.href = 'viewlocation.html';
}

// Code for the main app page (locations list).
function main() {
    var ul = document.getElementById("locationList");

    for (var index = 0; index < locationWeatherCache.length(); index++) {
        var location = locationWeatherCache.locationAtIndex(index);
        if (location == null) {
            console.log("Failed to find location at index: " + index);
            continue;
        }
        
        // Create onclick function for each location
        var li = document.createElement("li");
        li.className = "mdl-list__item mdl-list__item--two-line";
        li.setAttribute("onclick", "viewLocation(" + index + ")");
        ul.appendChild(li);

        var firstSpan = document.createElement("span");
        firstSpan.className = "mdl-list__item-primary-content";
        li.appendChild(firstSpan);

        var img = document.createElement("img");
        img.className = "mdl-list__item-icon list-avatar";
        // Img should default to the loading icon
        img.src = "images/loading.png";
        firstSpan.appendChild(img);
        
        // Display nickname for each location
        var secondSpan = document.createElement("span");
        secondSpan.innerHTML = location.nickname;
        firstSpan.appendChild(secondSpan);

        var thirdSpan = document.createElement("span");
        thirdSpan.className = "mdl-list__item-sub-title";
        // Default summary
        thirdSpan.innerHTML = "Loading weather summary...";
        firstSpan.appendChild(thirdSpan);

        // Load the current weather
        var now = new Date();
        locationWeatherCache.getWeatherAtIndexForDate(
            index, now,
            function(index, weatherObject) {
                var icon = weatherObject.daily.data[0].icon;
                var temperatureMin = weatherObject.daily.data[0].temperatureMin;
                var temperatureMax = weatherObject.daily.data[0].temperatureMax;

                img.src = "images/" + icon + ".png";
                thirdSpan.innerHTML = "Min: " + temperatureMin + " Celcius &nbsp; Max: " + temperatureMax + " Celcius";
            }
        );
    }
}
main();