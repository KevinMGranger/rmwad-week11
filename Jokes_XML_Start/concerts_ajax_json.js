/*
   OLD SCHOOL - NO jQuery used
   One issue will be that not every version of IE supports the XHR object
   */
"use strict";

window.onload= init;

function init(){
	document.getElementById("taytaybutton").onclick= function(){getTAYTAY('../last_fm_results.xml');};
}

function getTAYTAY(file) {
	var xhr = new XMLHttpRequest();
	if (xhr) {
		xhr.onreadystatechange = function() {
			displayResponse(xhr);
		};
		xhr.open("GET", file, true);
		xhr.send(null);
	}
}

function displayResponse(xhr) {
	if (xhr.readyState == 4) {
		if (xhr.status == 200 || xhr.status == 304) {
			// get reference to content div
			var contentDiv = document.getElementById('content');

			// clear contents of #content div
			contentDiv.innerHTML="";

			var events = JSON.parse(xhr.responseText).events.event;


			for (var i = 0; i < events.length; i++) {
				// get question, answer, and rating for all <joke> tags
				var concert = events[i];
				var title = concert.artists.headliner;
				var location = concert.venue.location.city;
				var startDate = startDate;
				var image = concert.venue.image.filter(function(obj){return obj.size == "mega";})[0]["#text"];


				var div = document.createElement('div');

				var tElement = document.createElement('h2');
				tElement.innerHTML = title;
				var cityDateElement = document.createElement('p');
				cityDateElement.innerHTML = "City: " + location + "--" + startDate;
				var imgElement = document.createElement('img');
				imgElement.src = image;



				div.appendChild(tElement);
				div.appendChild(cityDateElement);
				div.appendChild(imgElement);
				div.appendChild(document.createElement('hr'));
				contentDiv.appendChild(div);
			}
		}
	}
}
