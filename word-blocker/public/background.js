chrome.runtime.onInstalled.addListener(() => {
    const rule = {
      id: 1,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: { urlMatches: '.*' },
        resourceTypes: ['main_frame'],
        containsText: ['word1', 'word2'] // Replace 'word1' and 'word2' with your blocked words
      }
    };
  
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1] // Remove previously defined rule if it exists
    });
  
    chrome.declarativeNetRequest.updateDynamicRules({ addRules: [rule] });
  });
  