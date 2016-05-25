// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function main() {
  	var ul = document.getElementByID("locationList");
  	
  	for (var index = 0; index < locationWeatherCache.length(); index++) {
      	var location = locationWeatherCache.locationAtIndex(index);
      	
      	var li = document.createElement("li");
      	li.className = "mdl-list__item mdl-list__item--two-line";
      	li.onclick = viewLocation(location.nickname);
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
}()

/*var information = {
    // [name; nickname; latitude; longitude]
}

function displayInfo()
{
    for (var i = 0; i <=usefulInformation.length; i++)
        {
            return usefulInformation[i]
        }
}

var longLatTest =
{
    test: Math.round(Date.now()/1000),
    //set standard co-ordinates to melbourne CBD
	lattitude: -37.8136,
	longitude: 144.9631
}

var entry =
    {
        //API key obtained from dark sky
        apiKey: '6979e4c00b693d0a3ef2ddb64e6a94ab',
        lattitude: longLatTest.lattitude,
        longitude: longLatTest.longitude,
        timeNow: longLatTest.time,
        callBack: 'this.objectData'
    }

currentWeatherData = {
};

this.objectData = function(weatherData)
{
	currentWeatherData.current = weatherData.currently.apparentTemperature
    currentWeatherData.min = weatherData.daily.data[0].temperatureMin
	currentWeatherData.max = weatherData.daily.data[0].temperatureMax
	currentWeatherData.humidity = weatherData.daily.data[0].humidity
	currentWeatherData.summaryIcon = weatherData.daily.data[0].icon
	currentWeatherData.summaryText = weatherData.daily.data[0].summary
}

function jsonpRequest(url, params)
	{
		parameters = params.apiKey + '/' + params.lattitude + ',' + params.longitude + ',' + params.time + "/?" + 			"units=si&" + "callback" + "=" + params.callBack
   		var script = document.createElement('script');
   		script.src = url + parameters;
   		document.body.appendChild(script);
	}

jsonpRequest("https://api.forecast.io/forecast/", entry)*/