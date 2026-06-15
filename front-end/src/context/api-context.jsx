import {createContext, useContext, useState} from "react"

const ApiContext = createContext()

const BASE_URL = "http://127.0.0.1:8000/api"

export function ApiProvider({children}) {
    const [loginData, setLoginData] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))

    async function refreshToken() {
        console.log(loginData)
        setToken(loginData.token)
       
        await localStorage.setItem('token', loginData.token)
        await localStorage.setItem('user', JSON.stringify(loginData.user))
    }

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
        <ApiContext.Provider value={{apiFetch, setLoginData, loginData, token, refreshToken}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}