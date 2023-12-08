import React, { useState, useEffect } from 'react';
import './YourComponentStyles.css';

const CharacterFeature = () => {
    // State to manage user level, earned characters, and chosen character
    const [userLevel, setUserLevel] = useState(1);
    const [earnedCharacters, setEarnedCharacters] = useState(0);
    const [chosenCharacter, setChosenCharacter] = useState(null);

    useEffect(() => {
        // Calculation logic
        const studyHours = 24;
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
                            <img src={`characters/character${i + 1}.png`} alt={`Character ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Chosen Character Display */}
            {chosenCharacter && (
                <div id="chosen-character-info">
                    <p>You have chosen the following character:</p>
                    <img className="chosen-character-image" src={`Character_Images/character${chosenCharacter}.png`} alt={`Character ${chosenCharacter}`} />
                    <p>Earned at Level: {userLevel}</p>
                    <button onClick={() => setChosenCharacter(null)}>Return to Character Page</button>
                </div>
            )}
        </div>
    );
};

export default CharacterFeature;

