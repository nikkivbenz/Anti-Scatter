// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.userAuth) {
        // The user is logged in, so set popup to the home page
        chrome.action.setPopup({ popup: 'popup/Home/homePage.html' });
    } else {
        // The user is not logged in, so set popup to the logged out page
        chrome.action.setPopup({ popup: 'popup/loggedOut/loggedOut.html' });
    }
});

// Fetch blocked websites from the backend
async function fetchUserId() {
    // Get the user ID from the authentication token cookie
    try {
        var response = await fetch("http://localhost:4000/", {
            method: "POST",
            credentials: "include",
        });
        
        const userdata = await response.json();
        return userdata.user._id;
    } catch (error) {
        console.error(error);
    }
}

// Initialize the list of blocked websites
const userId = fetchUserId();

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const hostname = new URL(details.url).hostname;
        const currentDate = new Date();
    
        // Check if the current day is in the list of blocked days
        const currentDay = getDayName(currentDate); 
        if (blockedDays.includes(currentDay)) {
            // Check if the current time is within the specified time frame
            const currentTime = formatTime(currentDate); 
            if (isWithinTimeFrame(currentTime, blockedTimeFrame)) {
            return { cancel: true }; // Block the request
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// Helper function to get the day name
function getDayName(date) {
    const days = ["SUN", "SAT", "FRI", "THU", "WED", "TUE", "MON"];
    return days[date.getDay()];
}

// Helper function to format the time as "HH:MM"
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// Helper function to check if a given time is within a time frame
function isTimeWithinTimeFrame(time, timeFrame) {
    return time >= timeFrame.startTime && time <= timeFrame.endTime;
}