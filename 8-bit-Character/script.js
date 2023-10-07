//Katherine Hernandez

// Sample data from timeTracker.js (replace this with the actual data)
const studyHours = 24; // A fill in for now max is at 216
// ^ Replace that with the following once that use case is complete
// import { studyHours } from './timeTracker.js';

// Constants
const hoursPerLevel = 24;
const charactersPerLevel = 1;

// Calculate user level and earned characters
const userLevel = Math.floor(studyHours / hoursPerLevel) + 1;
const earnedCharacters = Math.floor(studyHours / hoursPerLevel) * charactersPerLevel;

// Update the HTML elements
document.getElementById('user-level').textContent = userLevel;
document.getElementById('earned-characters').textContent = earnedCharacters;

// Generate and display characters based on the earnedCharacters count
const characterList = document.getElementById('character-list');

// Create a function to handle character click events
function handleCharacterClick(characterNumber) {
  // Retrieve the level at which this character was earned from sessionStorage
  const characterEarnedLevel = sessionStorage.getItem(`character${characterNumber}Level`);

  // Store the chosen character number and user level in sessionStorage
  sessionStorage.setItem('chosenCharacter', characterNumber);
  sessionStorage.setItem('userLevel', userLevel);
  // Store the level at which this character was earned in sessionStorage
  sessionStorage.setItem('chosenCharacterLevel', characterEarnedLevel);

  // Redirect to the chosen-character.html page
  window.location.href = 'chosen-character.html';
}

for (let i = 1; i <= earnedCharacters; i++) {
  const characterDiv = document.createElement('div');
  characterDiv.classList.add('character');

  // Create an image element for each character
  const characterImage = document.createElement('img');
  characterImage.src = `characters/character${i}.png`; // Replace with the actual image path
  characterImage.alt = `Character ${i}`;

  // Add a click event listener to each character image
  characterImage.addEventListener('click', () => {
    handleCharacterClick(i); // Call the function with the character number
  });

  characterDiv.appendChild(characterImage);
  characterList.appendChild(characterDiv);

  // Store the level at which this character was earned in sessionStorage
  sessionStorage.setItem(`character${i}Level`, userLevel - Math.floor((earnedCharacters - i) / charactersPerLevel));
}
