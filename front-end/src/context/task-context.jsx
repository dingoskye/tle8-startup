import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const MainTaskContext = createContext()

export function MainTaskProvider({children}) {
    const {apiFetch, token} = useApi();
    const [mainTasks, setMainTasks] = useState(null)

    async function fetchMainTasks() {
        try {


            const data = await apiFetch(`/main`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            setMainTasks(data)
            console.log(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <MainTaskContext.Provider value={{
            mainTasks,
            fetchMainTasks
        }}>
            {children}
        </MainTaskContext.Provider>
    );
}

export function useMainTask() {
    return useContext(MainTaskContext)
}