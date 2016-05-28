function viewLocation(locationIndex)
{
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
      	
      	var li = document.createElement("li");
      	li.className = "mdl-list__item mdl-list__item--two-line";
        li.setAttribute("onclick", "viewLocation(" + index + ")");
      	ul.appendChild(li);
      
      	var firstSpan = document.createElement("span");
      	firstSpan.className = "mdl-list__item-primary-content";
      	li.appendChild(firstSpan);
      
      	var img = document.createElement("img");
      	img.className = "mdl-list__item-icon list-avatar";
      	img.src = "images/loading.png";
      	firstSpan.appendChild(img)
        
        var secondSpan = document.createElement("span");
      	secondSpan.innerHTML = location.nickname;
      	firstSpan.appendChild(secondSpan);

        var thirdSpan = document.createElement("span");
      	thirdSpan.className = "mdl-list__item-sub-title";
      	thirdSpan.innerHTML = "Weather Summary";
      	firstSpan.appendChild(thirdSpan);
    }
}
main();