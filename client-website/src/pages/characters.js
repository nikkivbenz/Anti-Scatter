import React, { useState, useEffect } from 'react';
import './CharacterStyles.css';

// Importing character images
import character1 from './Character_Images/character1.png';
import character2 from './Character_Images/character2.png';
import character3 from './Character_Images/character3.png';
import character4 from './Character_Images/character4.png';
import character5 from './Character_Images/character5.png';
import character6 from './Character_Images/character6.png';
import character7 from './Character_Images/character7.png';
import character8 from './Character_Images/character8.png';
import character9 from './Character_Images/character9.png';

// Mapping character numbers to their respective images
const characterImages = {
    1: character1,
    2: character2,
    3: character3,
    4: character4,
    5: character5,
    6: character6,
    7: character7,
    8: character8,
    9: character9,
};

const Characters = () => {
    // State to manage user level, earned characters, and chosen character
    const [userLevel, setUserLevel] = useState(1);
    const [earnedCharacters, setEarnedCharacters] = useState(0);
    const [chosenCharacter, setChosenCharacter] = useState(null);

    useEffect(() => {
        // Calculation logic
        const studyHours = 130; // Replace with actual data
        const hoursPerLevel = 24;
        const charactersPerLevel = 1;
        
        const level = Math.floor(studyHours / hoursPerLevel) + 1;
        const characters = Math.floor(studyHours / hoursPerLevel) * charactersPerLevel;

        setUserLevel(level);
        setEarnedCharacters(characters);
    }, []);

    const handleCharacterClick = (characterNumber) => {
        // Logic to handle character selection
        setChosenCharacter(characterNumber);
    };

    return (
        <div id="social-page">
            {/* Character level and progress */}
            <div id="character-level">
                <header><h1>Character Level</h1></header>
            </div>
            <div id="level-info">
                <h2>Your Progress</h2>
                <p>Level: <span>{userLevel}</span></p>
                <p>Characters Earned: <span>{earnedCharacters}</span></p>
            </div>

            {/* Choose Character Section */}
            <div id="choose-character">
                <h2>Choose Your Character</h2>
                <div id="character-list">
                    {[...Array(earnedCharacters)].map((_, i) => (
                        <div className="character" key={i} onClick={() => handleCharacterClick(i + 1)}>
                            <img src={characterImages[i + 1]} alt={`Character ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Chosen Character Display */}
            {chosenCharacter && (
                <div id="chosen-character-info">
                    <p>Congrats on your characters!</p>
                    <img className="chosen-character-image" src={characterImages[chosenCharacter]} alt={`Character ${chosenCharacter}`} />
                    <p>Congrats on making it to level: {userLevel} ! </p>
                    <button onClick={() => setChosenCharacter(null)}>Minimize Character</button>
                </div>
            )}
        </div>
    );
};

export default Characters;


