// content.js

// Function to check for the authentication token cookie
async function checkForAuthenticationCookie() {
    const response = await fetch("http://localhost:4000/", {
        method: "POST",
        credentials: "include",
    });

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
    .then(result => {
        const userAuth = result;
        // Communicate with the background script to send the login status
        chrome.runtime.sendMessage({ userAuth });
    })
    .catch(error => {
        console.error(error);
    });

var currentURL = window.location.href;
var url = new URL(currentURL);
var domain = url.hostname;
    
// Function to update the blocked websites list in local storage    
function checkBlockScheduleUpdate() {
    if (currentURL === 'http://localhost:3000/blockschedule') {
        // Define a callback function to handle mutations
        function mutationCallback(mutationsList, observer) {
            // Check each mutation in the list
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // A child node has been added or removed
                    // You can access the affected nodes via mutation.addedNodes and mutation.removedNodes
                    // Perform your action here when the DOM changes
                    chrome.runtime.sendMessage({ blockScheduleUpdate: true });
                }
            }
        }

        // Create a MutationObserver instance with the callback
        const observer = new MutationObserver(mutationCallback);

        // Options for the observer (which mutations to observe)
        const config = {
            childList: true, // Observe the addition or removal of child nodes (elements)
            subtree: true,   // Observe changes in all descendants of the target node
        };

        // Select the target node to observe (usually the whole document)
        const targetNode = document;

        // Start observing the document
        observer.observe(targetNode, config);
    }
}

checkBlockScheduleUpdate();

// Function to block websites
chrome.storage.local.get(["blockScheduleSites"], function (result) {
    const sites = result.blockScheduleSites || [];
    // Remove the "www." prefix if it exists
    const normalizedURL = domain.replace(/^www\./, '');
    if (sites.includes(normalizedURL)) {
        window.location.href = chrome.runtime.getURL("popup/block.html");
    }

    chrome.runtime.sendMessage({ blockScheduleUpdate: true });
});
