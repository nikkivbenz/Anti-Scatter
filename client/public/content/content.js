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


