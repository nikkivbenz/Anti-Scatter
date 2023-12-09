// content_script.js

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "checkLocalStorage") {
    // Check if the current tab URL is http://localhost:3000
    if (location.href === "http://localhost:3000/") {
      // Access the localStorage of the website
      const websiteLocalStorageData = window.localStorage.getItem("yourKey");

      // Send a response back to the popup
      sendResponse({ websiteLocalStorageData: websiteLocalStorageData });
    } else {
      // If the URL doesn't match, indicate that the check is not applicable
      sendResponse({ notApplicable: true });
    }
  }
});
