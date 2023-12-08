// content.js

/*------------------------------------------------ User Authentication -----------------------------------------------*/

// Function to check for the authentication token cookie
async function checkForAuthenticationCookie() {
  const response = await fetch(
    "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (response.ok) {
    const data = await response.json();

    if (data.status === true) {
      return true;
    } else {
      return false;
    }
  } else {
    throw new Error("Error fetching authentication status");
  }
}

// Check for the authentication token cookie
const isUserLoggedIn = checkForAuthenticationCookie();

isUserLoggedIn
  .then((result) => {
    const userAuth = result;
    // Communicate with the background script to send the login status
    chrome.runtime.sendMessage({ userAuth });
  })
  .catch((error) => {
    console.error(error);
  });

var currentURL = window.location.href;
var url = new URL(currentURL);
var domain = url.hostname;
chrome.runtime.sendMessage({ blockScheduleUpdate: true });

/*---------------------------------------------------------------------------------------------------------------------*/

// Function to block websites
chrome.storage.local.get(["blockScheduleSites"], function (result) {
  const sites = result.blockScheduleSites || [];
  // Remove the "www." prefix if it exists
  const normalizedURL = domain.replace(/^www\./, "");
  if (sites.includes(normalizedURL)) {
    window.location.href = chrome.runtime.getURL("../popup/block.html");
  }

  chrome.runtime.sendMessage({ blockScheduleUpdate: true });
});

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

var currentURL = window.location.href;
var url = new URL(currentURL);
var domain = url.hostname;

// if url is in chrome.local sites, execute blackout
chrome.storage.local.get(["sites"], function (result) {
  var sites = result.sites || [];

  if (sites.includes(domain)) {
    blackout();
  }
});

/*---------------------------------------------------------------------------------------------------------------------*/
