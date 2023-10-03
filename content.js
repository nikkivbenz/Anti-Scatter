// popup.js
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logButton").addEventListener("click", blackout);
});

function logCurrentURL() {
  var currentURL = window.location.href;
  console.log("Current URL:", currentURL);
}

function blackout() {
  var currentURL = window.location.href;
  console.log("Current URL:", currentURL);
  var body = document.getElementsByTagName("body")[0];
  body.style.backgroundColor = "black";
}

// Inject the logCurrentURL function into the webpage
logCurrentURL();
blackout();
