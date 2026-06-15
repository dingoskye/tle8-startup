import {createContext, useContext, useEffect, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const {apiFetch, token} = useApi();
    const [theme, setTheme] = useState("theme-default")
    const [font, setFont] = useState("font-default")
    const [knownThemes, setKnownThemes] = useState(null)
    const [settings, setSettings] = useState(null)

    async function fetchThemes() {
        try {
            const data = await apiFetch(`/theme`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            console.log(data)
            setKnownThemes(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchSettings() {
        try {
            const data = await apiFetch(`/theme/details`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            setSettings(data[0])
            console.log(data)
            setTheme(`theme-${data[0].theme.name}`)
            setFont(data[0].written_font ? "font-default" : "font-simple")
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        document.documentElement.className = `${theme} ${font}`;
    }, [theme, font]);

    return (
        <ThemeContext.Provider value={{
            theme,
            font,
            knownThemes,
            settings,
            fetchThemes,
            fetchSettings
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext)
}