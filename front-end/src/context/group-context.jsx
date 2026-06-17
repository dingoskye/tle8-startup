import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const GroupContext = createContext()

export function GroupProvider({children}) {
    const {apiFetch, token} = useApi();
    const [groups, setGroups] = useState(null)

    async function fetchGroups() {
        try {
            const data = await apiFetch(`/group`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            setGroups(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchGroup(id) {
        try {
            const data = await apiFetch(`/group/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
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
            setGroups,
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