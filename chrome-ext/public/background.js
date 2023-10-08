/*
    The background script is the extension's event handler; it contains listeners for browser events that are important to the extension.
    It lies dormant until an event is fired then performs the instructed logic.
    An effective background script is only loaded when it is needed and unloaded when it goes idle.
*/

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
        const blockedWebsites = data.blockedWebsites;
        const url = new URL(details.url);
        var urlToBlock = url.hostname;
        
        if (blockedWebsites.includes(urlToBlock)) {
            chrome.tabs.update(details.tabId, { url: 'blocked.html' }); // Redirect to a blocked page
        }
        urlNoWWW = urlToBlock.replace('www.', '');
        if (blockedWebsites.includes(urlNoWWW)) {
            chrome.tabs.update(details.tabId, { url: 'blocked.html' }); // Redirect to a blocked page
        }

        urlToBlock = url.protocol + '//' + urlToBlock + '/';
        if (blockedWebsites.includes(urlToBlock)) {
            chrome.tabs.update(details.tabId, { url: 'blocked.html' }); // Redirect to a blocked page
        }
    });
});