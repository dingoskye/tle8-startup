import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const LoginContext = createContext()

export function LoginProvider({children}) {
    const {apiFetch} = useApi();
    const [loginData, setLoginData] = useState(null)
    const [users, setUsers] = useState(null)

    async function fetchLogin(formData) {
        try {

            const data = await apiFetch(`/api/user/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    email: formData.email,
                    password: formData.password,
                }
            })
            setLoginData(data)

        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchRegister(formData) {
        try {
            console.log(formData)
            console.log(formData.user_name, formData.email, formData.password)
            const data = await apiFetch(`/api/user/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            setLoginData(data)

        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchUsers() {
        try {
            const data = await apiFetch(`/api/user`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            setUsers(data)

        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <LoginContext.Provider value={{
            loginData,
            fetchLogin,
            fetchRegister,
            fetchUsers,
            users
        }}>
            {children}
        </LoginContext.Provider>
    );


}

export function useLogin() {
    return useContext(LoginContext)
}

