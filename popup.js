// popup.js
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logButton").addEventListener("click", function () {
    // Send a message to the content script to log the current URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: logCurrentURL,
      });
    });
  });
});

function logCurrentURL() {
  var currentURL = window.location.href;
  console.log("Current URL:", currentURL);
}
