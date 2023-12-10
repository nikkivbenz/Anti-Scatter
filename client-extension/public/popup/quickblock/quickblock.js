// popup.js


// document.getElementById("block").addEventListener("click", function () {
//   executeScriptAndReload(block);
// });

// document.getElementById("unblock").addEventListener("click", function () {
//   executeScriptAndReload(unBlock);
// });

// document.getElementById("clear").addEventListener("click", function () {
//   executeScriptAndReload(clearLocalStorage["blockedSites"]);
// });

// Add an event listener to the window.onstorage event. Updates list on extension.
window.addEventListener("storage", function (event) {
  if (event.key === "blockedSites") {
    updateBlockedSites();
  }
});

function executeScriptAndReload(scriptFunction) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        function: scriptFunction,
      })
      .then(() => {
        chrome.tabs.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function updateBlockedSites() {
  chrome.storage.local.get("blockedSites", function(result) {
    // result is an object with the stored keys
    var sites = result.blockedSites; // Access the first array
    console.log(sites);

 var ul = document.getElementById("blocked-sites");
  ul.innerHTML = "";

  sites.forEach(function (site) {
    var li = document.createElement("li");
    li.textContent = site;
    ul.appendChild(li);
  });


  });


  
 
}

// function block() {
//   var currentURL = window.location.href;
//   var url = new URL(currentURL);
//   var domain = url.hostname;

//   var sites = JSON.parse(chrome.storage.local.get("blockedSites")) || [];

//   if (sites.includes(domain)) {
//     console.log("Domain already exists in localStorage:", domain);
//     return;
//   }

//   sites.push(domain);
//   localStorage.setItem("sites", JSON.stringify(sites));
//   console.log("Domain added to localStorage:", domain);
// }

// function unBlock() {
//   var currentURL = window.location.href;
//   var url = new URL(currentURL);
//   var domain = url.hostname;

//   var sites = JSON.parse(chrome.storage.local.get("blockedSites")) || [];

//   if (!sites.includes(domain)) {
//     console.log("Domain not found in localStorage:", domain);
//     return;
//   }

//   sites = sites.filter(function (site) {
//     return site !== domain;
//   });

//   localStorage.setItem("sites", JSON.stringify(sites));
//   console.log("Domain removed from localStorage:", domain);
// }

// function clearLocalStorage() {
//   localStorage.removeItem("sites");
//   console.log("localStorage (sites) cleared.");
// }

updateBlockedSites();
