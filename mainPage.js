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

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
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

jsonpRequest("https://api.forecast.io/forecast/", entry)