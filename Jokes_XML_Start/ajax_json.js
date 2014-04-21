/*
   OLD SCHOOL - NO jQuery used
   One issue will be that not every version of IE supports the XHR object
   */
"use strict";

window.onload= init;

function init(){
	document.getElementById("jokesbutton").onclick= function(){getJokes('jokes.xml');};
}

function getJokes(file) {
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
			var allDaJokes = xhr.responseXML.getElementsByTagName('joke');


			// loop through all <joke> tags
			for (var i = 0; i < allDaJokes.length; i++) {
				// get question, answer, and rating for all <joke> tags
				var joke = allDaJokes[i];
				var question = joke.getElementsByTagName('question')[0].firstChild.nodeValue;
				var answer = joke.getElementsByTagName('answer')[0].firstChild.nodeValue;
				var rating = joke.getAttribute('rating');

				var div = document.createElement('div');

				var qElement = document.createElement('h2');
				qElement.innerHTML = question;
				var aElement = document.createElement('em');
				aElement.innerHTML = answer;
				var rElement = document.createElement('p');
				rElement.innerHTML = "Rating = " + rating;

				div.appendChild(qElement);
				div.appendChild(aElement);
				div.appendChild(rElement);
				div.appendChild(document.createElement('hr'));
				contentDiv.appendChild(div);
			}
		}
	}
}
