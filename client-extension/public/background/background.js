// background.js

//Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.userAuth) {
    // The user is logged in, so set popup to the home page
    chrome.action.setPopup({ popup: "popup/Home/homePage.html" });

    updateBlockScheduleStorage();
  } else {
    // The user is not logged in, so set popup to the logged out page
    chrome.action.setPopup({ popup: "popup/loggedOut/loggedOut.html" });
  }

  if (request.blockScheduleUpdate) {
    updateBlockScheduleStorage();
  }

  // if token message is recieved, change to logged in status
  if (request.token) {
    chrome.storage.local.set({ token: request.token }, function () {
      console.log("Token is set to " + request.token);
    });
    chrome.action.setPopup({
      popup: "popup/quickblock/quickblock.html",
    });
  }

  if (request.blockedSites) {
    chrome.storage.local.get(["blockedSites"], function (result) {
      var sites = result.blockedSites || [];
      sites.push(request.blockedSites);

      chrome.storage.local.set({ blockedSites: sites }, function () {
        console.log("Blocked sites have been updated");
      });
    });
  }
});

chrome.storage.local.get("token", function (data) {
  if (data) {
    console.log("bruh ");
    chrome.action.setPopup({
      popup: "popup/quickblock/quickblock.html",
    });
  }
});
// ...

/*---------------------------------------------------------------------------------------------------------------------*/

// Fetch blocked websites from the backend
async function fetchUserId() {
  // Get the user ID from the authentication token cookie
  try {
    const response = await fetch(
      "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const userdata = await response.json();
    return userdata.user._id;
  } catch (error) {
    console.error(error);
  }
}

/*---------------------------------------------------------------------------------------------------------------------*/

// Update the blocked websites in the storage
async function updateBlockScheduleStorage() {
  try {
    var userId = await fetchUserId();

    const currentDate = new Date();
    const currentDay = getDayName(currentDate);

    const response = await fetch(
      `https://anti-scatter-36f9c5f65c17.herokuapp.com/${userId}/${currentDay}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const blockedSites = (await response.json()).blockSchedule;

    chrome.storage.local.get(["blockScheduleSites"], function (result) {
      var sites = [];

      blockedSites.forEach((blockedSite) => {
        if (isTimeWithinTimeFrame(blockedSite.timeFrame)) {
          var domain = extractHostname(blockedSite.website);

          sites.push(domain);
        }
      });

      chrome.storage.local.set({ blockScheduleSites: sites }, function () {
        console.log(`${domain} has been added to the block schedule`);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// Helper function to extract the hostname from a URL
function extractHostname(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // URL already has a scheme
    return new URL(url).hostname;
  } else {
    // URL without a scheme, assume "https://"
    return new URL("https://" + url).hostname;
  }
}

// Helper function to get the day name
function getDayName(date) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getDay()];
}

// Helper function to check if a given time is within a time frame
function isTimeWithinTimeFrame(timeFrame) {
  const date = new Date();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return time >= timeFrame.startTime && time <= timeFrame.endTime;
}

/*---------------------------------------------------------------------------------------------------------------------*/
