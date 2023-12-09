// background.js

// Function to block requests
function blockRequest(details) {
  return { cancel: true };
}

// Set up the webRequest listener to block requests for blocked websites
browser.webRequest.onBeforeRequest.addListener(
  blockRequest,
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);

// Function to update the list of blocked websites
function updateBlockedWebsites() {
  browser.storage.local.get(["blockedThemes"], function (result) {
    const blockedThemes = result.blockedThemes || [];

    browser.storage.local.get(["blockedSites"], function (result) {
      const blockedSites = result.blockedSites || [];

      const blockedWebsites = [
        ...blockedThemes,
        ...blockedSites.map((site) => site.url),
      ];

      // Update the blocked websites in local storage
      browser.storage.local.set({ blockedWebsites: blockedWebsites });
    });
  });
}

// Update the blocked websites when the extension is installed or updated
browser.runtime.onInstalled.addListener(updateBlockedWebsites);

// Listen for changes in local storage and update the blocked websites accordingly
browser.storage.onChanged.addListener(function (changes) {
  if (changes.blockedThemes || changes.blockedSites) {
    updateBlockedWebsites();
  }
});
