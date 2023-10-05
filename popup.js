// popup.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("fart.");
});

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
  var json = {
    domain: domain,
  };

  // Log the JSON object
  console.log("Domain JSON with Wildcards:", json);

  // You can now use the 'json' object as needed.
}
function blackout() {
  var body = document.getElementsByTagName("body")[0];
  body.style.display = "none";
  // add a h1 that says "blocked"
  var heading = document.createElement("h1");

  // Set the text content of the <h1> element to "blocked"
  heading.textContent = "Blocked";
  heading.style.display = "initial !important";

  // Append the <h1> element to the HTML body

  document.body.appendChild(heading);
}

function unBlock() {
  var body = document.getElementsByTagName("body")[0];
  body.style.display = "initial";
}
