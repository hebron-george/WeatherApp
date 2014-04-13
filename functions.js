/*
	Author: Hebron George
	Created Date: April 10, 2014
	Last Updated: April 10, 2014
	
	Second Author: Mahmoud Ibrahim  **Adding few function, and editting some
*/

/**
 * Global variable containing the location we would like to pass to forecast.io.
 *
 * @type {Array.<string>}
 */
/** 
 * Geolcation functionality:
 * the following block will 
 */
 var lat_long = new Array('28.077403', '-82.444209');

/**
 * Global variable containing our api key for forecast.io.
 *
 * @type {string}
 */
 var api_key = '01c7f722bde2c6222909824390a66d45';

 var weatherGenerator = {
 	/**
 	 * Forecast.io URL that will give us the weather data we're looking for.
 	 *
 	 * See https://developer.forecast.io/docs/v2 for details about construction
 	 * of this url
 	 *
 	 * @type {string}
 	 * @private
 	 */
 	searchOnForecastIO_: 'https://api.forecast.io/forecast/' + api_key + '/' +
 	encodeURIComponent(lat_long[0]) + ',' +
 	encodeURIComponent(lat_long[1]),

 	/**
 	 * Sends an XHR GET request to grab info from forecast.io. The XHR's
 	 * 'onload' event is hooks up to the 'showWeather_' method.
 	 *
 	 * @public
 	 */
 	requestWeather: function(){
 		var req = new XMLHttpRequest();
 		req.open("GET", this.searchOnForecastIO_, true);
 		req.onload = this.showWeather_.bind(this);
 		req.send(null);
 	},

 	/**
 	 * Handle the 'onload' event of our weather XHR request, generated in
 	 * 'requestWeather', by generating 'div' elements, and stuffing them into
 	 * the document for display
 	 *
 	 * @param {ProgressEvent} e The XHR ProgressEvent.
 	 * @private
 	 */
 	showWeather_: function (e) {
 		var myJSONObject = JSON.parse(e.target.responseText);

 		var divTemp = document.createElement('div');
 		divTemp.setAttribute('id', 'temp');
 		var temp = document.createElement('p');
 		temp.innerHTML = 'Current Temp: ' + myJSONObject.currently.temperature;
 		var summary = document.createElement('p');
 		summary.innerHTML = 'Summary: ' + myJSONObject.currently.summary;


 		divTemp.appendChild(temp);
 		divTemp.appendChild(summary);
 		document.getElementById('zip_codes').appendChild(divTemp);
 	}
 }

 // Run weather generation script as soon as the DOM loads.
 document.addEventListener('DOMContentLoaded', function(){
 	weatherGenerator.requestWeather();
 });
