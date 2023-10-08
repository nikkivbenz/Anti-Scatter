document.addEventListener('DOMContentLoaded', function () {
    const blockedWebsitesList = document.getElementById('blocked-websites');
    const websiteInput = document.getElementById('website-url');
    const blockButton = document.getElementById('block-button');

    // Load the blocked websites from storage and display them
    function refreshBlockedWebsitesList() {
        chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
            const blockedWebsites = data.blockedWebsites;
            blockedWebsitesList.innerHTML = ''; // Clear the list
            blockedWebsites.forEach(function (website) {
            const li = document.createElement('li');
            li.textContent = website;
            
            // Add a remove button for each blocked website
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                // Remove the website from the blocked list
                const updatedBlockedWebsites = blockedWebsites.filter(item => item !== website);
                chrome.storage.sync.set({ blockedWebsites: updatedBlockedWebsites }, function () {
                // Refresh the blocked websites list
                refreshBlockedWebsitesList();
                });
            });
    
            li.appendChild(removeButton);
            blockedWebsitesList.appendChild(li);
            });
        });
    }

    refreshBlockedWebsitesList(); // Initialize the list

    // Add a website to the blocked list when the block button is clicked
    blockButton.addEventListener('click', function () {
        const websiteUrl = websiteInput.value;
        if (websiteUrl) {
            chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
            const blockedWebsites = data.blockedWebsites;
            blockedWebsites.push(websiteUrl);
            chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
                websiteInput.value = '';
                refreshBlockedWebsitesList(); // Refresh the blocked websites list
            });
            });
        }
    });
});