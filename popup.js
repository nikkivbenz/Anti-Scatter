// popup.js

document.getElementById("block").addEventListener("click", function () {
  // query chrome for the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.scripting;

    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        function: block,
      })
      .then(() => {
        chrome.tabs.reload();
      })
      .catch((err) => {});
  });
});

document.getElementById("unblock").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        function: unBlock,
      })
      .then(() => {
        chrome.tabs.reload();
      })
      .catch((err) => {});
  });
});

document.getElementById("clear").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        function: clearLocalStorage,
      })
      .then(() => {
        chrome.tabs.reload();
      })
      .catch((err) => {});
  });
});

// Add an event listener to the chrome.storage.onChanged event
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.sites) {
    updateBlockedSites();
  }
});

// get ul element by id blocked sites, and when a site is added to local storage, add a li element with the site name to the ul element
function updateBlockedSites() {
  chrome.storage.local.get(["sites"], function (result) {
    var sites = result.sites || [];

    var ul = document.getElementById("blocked-sites");
    ul.innerHTML = "";

    sites.forEach(function (site) {
      var li = document.createElement("li");
      li.textContent = site;
      ul.appendChild(li);
    });
  });
}

// Call the function once to populate the list on page load

function block() {
  var currentURL = window.location.href;
  var url = new URL(currentURL);

  // Extract the domain from the URL
  var domain = url.hostname;

  // Retrieve the current value of "sites" from local storage
  chrome.storage.local.get(["sites"], function (result) {
    var sites = result.sites || [];

    //if chrome storage has a sites array and the domain is already in the array, return
    if (sites.includes(domain)) {
      console.log("Domain already exists in storage.local:", domain);
      return;
    }

    // Add the new domain to the existing sites array
    sites.push(domain);

    // Set the updated value of "sites" back to local storage
    chrome.storage.local.set({ sites: sites }, function () {
      console.log("Domain added to storage.local:", domain);
    });
  });
}

function unBlock() {
  var currentURL = window.location.href;
  var url = new URL(currentURL);

  // Extract the domain from the URL
  var domain = url.hostname;

  // Retrieve the current value of "sites" from local storage
  chrome.storage.local.get(["sites"], function (result) {
    var sites = result.sites || [];

    // If the domain is not in the sites array, return
    if (!sites.includes(domain)) {
      console.log("Domain not found in storage.local:", domain);
      return;
    }

    // Remove the domain from the sites array
    sites = sites.filter(function (site) {
      return site !== domain;
    });

    // Set the updated value of "sites" back to local storage
    chrome.storage.local.set({ sites: sites }, function () {
      console.log("Domain removed from storage.local:", domain);
    });
  });
}

function clearLocalStorage() {
  chrome.storage.local.clear(function () {
    console.log("Local storage cleared.");
  });
}

updateBlockedSites();
