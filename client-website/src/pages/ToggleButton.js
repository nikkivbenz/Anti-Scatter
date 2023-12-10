import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ToggleButton = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>Toggle Dark Mode</button>
    );
};

export default ToggleButton;
