// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const checkLocalStorageButton = document.getElementById("checkLocalStorage");
  const localStorageDataParagraph = document.getElementById("localStorageData");

  checkLocalStorageButton.addEventListener("click", function () {
    // Send a message to the content script to check localStorage
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "checkLocalStorage" },
        function (response) {
          // Handle the response from the content script
          if (response && response.websiteLocalStorageData) {
            localStorageDataParagraph.textContent =
              "Website localStorage: " + response.websiteLocalStorageData;
          } else if (response && response.notApplicable) {
            localStorageDataParagraph.textContent =
              "Check not applicable for the current website.";
          } else {
            localStorageDataParagraph.textContent =
              "Unable to retrieve website localStorage.";
          }
        }
      );
    });
  });
});
