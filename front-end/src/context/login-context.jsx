import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const LoginContext = createContext()

export function LoginProvider({children}) {
    const {apiFetch, setLoginData, loginData} = useApi();

    const [users, setUsers] = useState(null)

    async function fetchLogin(formData) {
        try {

            const data = await apiFetch(`/user/login`, {
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

    async function fetchRegister(formData) {
        try {
            console.log(formData)
            console.log(formData.user_name, formData.email, formData.password)
            const data = await apiFetch(`/user/register`, {
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
            const data = await apiFetch(`/user`, {
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

