import {createContext, useContext} from "react"

const ApiContext = createContext()

const BASE_URL = "http://127.0.0.1:8000"

export function ApiProvider({children}) {
    async function apiFetch(endpoint, options = {}) {
        const res = await fetch(BASE_URL + endpoint, {
            headers: {
                ...options.headers,
            },
            ...options,
        })
        // console.log(res.status)
        if (!res.ok) {
            return {"status": res.status, "message": res.statusText}
            // throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text()
        return text ? JSON.parse(text) : null
    }

    return (
        <ApiContext.Provider value={{apiFetch}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}