// content.js
import axios from "axios";
/*------------------------------------------------ User Authentication -----------------------------------------------*/
const homePageUrl = "http://localhost:3000/"

chrome.tabs.query({ active: true, currentWindow: true, url: homePageUrl }, async function (tabs) {
  try {
    console.log("Verifying cookie...");
    const storedToken = window.localStorage.getItem("token");
    console.log("Stored token:", storedToken);
    const { data } = await axios.post(
      "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
      {token: storedToken}
    );

    const { status, user } = data;

    const userAuth = status;

    chrome.runtime.sendMessage({ userAuth });
  } catch (error) {
    console.log("Error verifying cookie:", error);
    return false;
  }
});

/*---------------------------------------------------------------------------------------------------------------------*/

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
