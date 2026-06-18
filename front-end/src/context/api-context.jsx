import {createContext, useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router";

const ApiContext = createContext()

const BASE_URL = "/api"

export function ApiProvider({children}) {
    const [loginData, setLoginData] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    async function refreshToken() {
        setToken(loginData.token)

        await localStorage.setItem('token', loginData.token)
        await localStorage.setItem('user', JSON.stringify(loginData.user))
    }

    async function getData() {
        const data = await JSON.parse(localStorage.getItem('user'))
        setLoginData(data)
        setLoading(false)
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
            if (res.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                loginData(null)
            }
            return {"status": res.status, "message": res.statusText}
            // throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text()
        return text ? JSON.parse(text) : null
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ApiContext.Provider
            value={{apiFetch, setLoginData, loginData, token, refreshToken, getData, loading}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}