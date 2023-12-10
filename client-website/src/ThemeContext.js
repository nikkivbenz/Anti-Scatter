import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // default theme

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'; //Added
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log("Theme changed to:", newTheme); // Added this line to log the theme change
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
