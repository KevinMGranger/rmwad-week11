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

			// parse the XML file we loaded
			// remember getElementsByTagName() from last quarter?
			var allDaConcerts = xhr.responseXML.getElementsByTagName('event');


			for (var i = 0; i < allDaConcerts.length; i++) {
				// get question, answer, and rating for all <joke> tags
				var concert = allDaConcerts[i];
				var title = concert.getElementsByTagName('title')[0].firstChild.nodeValue;
				var location = concert.getElementsByTagName('location')[0].firstChild.getElementsByTagName('city')[0].firstChild.nodeValue;
				var startDate = concert.getElementsByTagName('startDate')[0].firstChild.nodeValue;
				// how to get largest?
				var image = concert.getElementsByTagName('image')

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
