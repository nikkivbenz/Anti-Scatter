document.addEventListener('DOMContentLoaded', function () {
    const blockedWordsList = document.getElementById('blockedWordsList');
    const wordInput = document.getElementById('wordInput');
    const addWordButton = document.getElementById('addWordButton');
  
    // Load blocked words from storage and display them
    chrome.storage.sync.get(['blockedWords'], (result) => {
      const blockedWords = result.blockedWords || [];
      blockedWords.forEach((word) => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        blockedWordsList.appendChild(listItem);
      });
    });
  
    // Add a new blocked word
    addWordButton.addEventListener('click', function () {
      const word = wordInput.value.trim();
      if (word) {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        blockedWordsList.appendChild(listItem);
  
        // Save the updated list of blocked words to storage
        chrome.storage.sync.get(['blockedWords'], (result) => {
          const blockedWords = result.blockedWords || [];
          blockedWords.push(word);
          chrome.storage.sync.set({ blockedWords });
        });
  
        wordInput.value = '';
      }
    });
  });
  