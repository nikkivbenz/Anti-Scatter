// popup.js

document.getElementById("logButton").addEventListener("click", function () {
  // Send a message to the content script to log the current URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: logCurrentURL,
    });
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: blackout,
    });
  });
});

document.getElementById("unblock").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: unBlock,
    });
  });
});

function logCurrentURL() {
  // write into json file

  const fs = require("fs");
  var currentURL = window.location.href;
  var url = new URL(currentURL);

  // Extract the domain from the URL
  var domain = url.hostname;

  // Remove "www." if present
  // domain = domain.replace(/^www\./, "*.");

  // Remove "http://", "https://", or "://" if present
  domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "*.");

  // Find the last occurrence of ".com" and keep everything before it
  var lastIndex = domain.lastIndexOf(".com");

  if (lastIndex !== -1) {
    domain = domain.substring(0, lastIndex) + ".*";
  }

  // Create a JSON object to store the domain with the wildcards

  // Write the JSON object to a file
  var json = JSON.stringify(domain);
  fs.writeFile("test.json", json, "utf8", callback);

  // Log the JSON object
  console.log("Domain JSON with Wildcards:", json);

  // You can now use the 'json' object as needed.
}
function blackout() {
  // var body = document.getElementsByTagName("body")[0];
  // body.style.display = "none";
  // add a h1 that says "blocked"
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
  message.textContent = "This website has been blocked.";

  // Append the <p> element to the <div> element
  cover.appendChild(message);

  // Append the <div> element to the HTML body
  document.body.appendChild(cover);
}

function unBlock() {
  location.reload();
}
