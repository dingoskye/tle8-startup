import {createContext, useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router";

const ApiContext = createContext()

const BASE_URL = "http://127.0.0.1:8000/api"

export function ApiProvider({children}) {
    const [first, setFirst] = useState(false)
    const [loginData, setLoginData] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [loggedOut, setLoggedOut] = useState(true)
    const navigate = useNavigate()

    async function refreshToken() {
        console.log(loginData)
        setToken(loginData.token)

        await localStorage.setItem('token', loginData.token)
        await localStorage.setItem('user', JSON.stringify(loginData.user))
    }

    async function getData() {
        const data = await JSON.parse(localStorage.getItem('user'))
        setLoginData(data)
        // console.log(data)
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
                setLoggedOut(true)
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

    useEffect(() => {
        setFirst(JSON.parse(localStorage.getItem("first")))
    }, []);

    useEffect(() => {
        if (!loggedOut) {
            navigate("/login")
        }
    }, [loggedOut])

    return (
        <ApiContext.Provider value={{apiFetch, setLoginData, setLoggedOut, loginData, token, refreshToken, getData, setFirst}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}