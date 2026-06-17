import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";
import {useNavigate} from "react-router";

const LoginContext = createContext()

export function LoginProvider({children}) {
    const {apiFetch, setLoginData, setLoggedOut} = useApi();


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
            setLoggedOut(false)
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
            setLoggedOut(false)
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

    function logout() {
        localStorage.clear()
        setLoggedOut(true)
    }

    return (
        <LoginContext.Provider value={{
            fetchLogin,
            fetchRegister,
            fetchUsers,
            users,
            logout
        }}>
            {children}
        </LoginContext.Provider>
    );


}

export function useLogin() {
    return useContext(LoginContext)
}

