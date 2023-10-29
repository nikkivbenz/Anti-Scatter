// popup.js
var currentURL = window.location.href;
var url = new URL(currentURL);

// Extract the domain from the URL
var domain = url.hostname;

function blackout() {
  Array.from(document.body.children).forEach((child) => {
    child.style.display = "none";
  });

  var cover = document.createElement("div");
  cover.id = "cover";

  // Set the text content of the <h1> element to "blocked"

  cover.style.position = "absolute";
  cover.style.zIndex = "999999";
  cover.style.width = "100%";
  cover.style.height = "100%";
  cover.style.backgroundColor = "red";

  // Create a <p> element
  var message = document.createElement("h1");
  message.style.color = "black";
  message.style.textAlign = "center";
  message.style.marginTop = "25%";
  message.style.fontSize = "50px";
  message.textContent =
    "This website has been blocked. If it has been removed from the list, reload this page.";

  // Append the <p> element to the <div> element
  cover.appendChild(message);

  // Append the <div> element to the HTML body
  document.body.appendChild(cover);
}

// if url is in chrome.local sites, execute blackout
chrome.storage.local.get(["sites"], function (result) {
  var sites = result.sites || [];

  if (sites.includes(domain)) {
    blackout();
  }
});
