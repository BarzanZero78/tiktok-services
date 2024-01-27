import { useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [currentAccent, setCurrentAccent] = useState('default');

    const changeAccent = (newAccent) => {
        setCurrentAccent(newAccent);
    }

    const setApplicationAccent = (newAccent) => {
        changeAccent(newAccent);
    }

    const context = {
        currentAccent,
        changeAccent,
        setApplicationAccent,
    }

    return (
        <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
    )
}