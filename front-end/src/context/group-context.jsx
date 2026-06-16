import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const GroupContext = createContext()

export function GroupProvider({children}) {
    const {apiFetch} = useApi();
    const [groups, setGroups] = useState(null)

    async function fetchGroups() {
        try {
            const data = await apiFetch(`/api/group`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            setGroups(data)
            // console.log(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchGroup(id) {
        try {
            const data = await apiFetch(`/api/group/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            return (data)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <GroupContext.Provider value={{
            groups,
            fetchGroups,
            fetchGroup
        }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    return useContext(GroupContext)
}