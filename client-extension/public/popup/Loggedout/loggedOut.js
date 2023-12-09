document.addEventListener("DOMContentLoaded", function () {
  // Add a click event listener to the login button
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function () {
    // Redirect to your login page or another website for login
    chrome.tabs.create({
      url: "https://boisterous-biscotti-c124c9.netlify.app/login",
    }); // Replace with your login URL
  });
});
