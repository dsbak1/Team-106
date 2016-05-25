// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

//This is the time for a single day in milliseconds
var day = 86400000

//Loads the current date and turns it into milliseconds
var today = new Date()
var todayMilli = today.getTime()

//Loads the date of any day in the past by subtracting the day variable x number of times
var anyDayMilli = todayMilli + (day * document.getElementById("slider").value)
var anyDay = new Date(anyDayMilli)

//Turns the current time into a simple string
var current = today.simpleDateString()

//Loads the window width
var winW = window.innerWidth

var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
if (locationIndex !== null) {
    var locationNames = [ "Location A", "Location B" ];
    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
}

//Starts the slider in the far right position
function sliderInit() {
	document.getElementById("slider").value = 0
	document.getElementById("dateOut").innerHTML = today.simpleDateString()
	document.getElementById("dateOut").style.width = (winW - 32) + "px"
	
	//
};

//Changes the date in the slider output
function sliderChange() {
	current = new Date(todayMilli - (day * document.getElementById("slider").value * -1))
	document.getElementById("dateOut").innerHTML = current.simpleDateString()
	
	//
};

//Map
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -37.9120467, lng: 145.1343136},
		zoom: 17
	});
};
