import {createContext, useContext, useEffect, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const {apiFetch} = useApi();
    const [theme, setTheme] = useState("theme-default")
    const [font, setFont] = useState("font-default")

    useEffect(() => {
        document.documentElement.className = theme + font;
    }, [theme, font]);

    return (
        <ThemeContext.Provider value={{
            theme
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext)
}