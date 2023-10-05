// popup.js
var currentURL = window.location.href;
function logCurrentURL() {
  console.log("Current URL (CONTENT SCRIPT):", currentURL);
}

if (currentURL === "www.google.com") {
  var body = document.getElementsByTagName("body")[0];
  body.style.display = "none";
}

// Inject the logCurrentURL function into the webpage
logCurrentURL();
// blackout();
