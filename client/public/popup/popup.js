// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Get the redirect button element
    var redirectButton = document.getElementById('redirectButton');

    // Add a click event listener to the button
    redirectButton.addEventListener('click', function () {
        // Redirect to the desired website when the button is clicked
        chrome.tabs.create({ url: 'localhost:3000/' });
    });
});