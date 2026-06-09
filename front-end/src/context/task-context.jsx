import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const MainTaskContext = createContext()

export function MainTaskProvider({children}) {
    const {apiFetch} = useApi();
    const [mainTasks, setMainTasks] = useState(null)

    async function fetchMainTasks() {
        try {
            const data = await apiFetch(`/main/1`, { //tijdelijke hardcoded user id
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
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