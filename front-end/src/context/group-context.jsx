import {createContext, useContext, useState} from "react"
import {useApi} from "@/context/api-context.jsx";

const GroupContext = createContext()

export function GroupProvider({children}) {
    const {apiFetch, token} = useApi();
    const [groups, setGroups] = useState(null)
    const [code, setCode] = useState(null)
    const [acceptData, setAcceptData] = useState(null)


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

    async function fetchCode(id) {
        try {
            console.log('------ fetchCode ------')
            const data = await apiFetch(`/group/link/${id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            setCode(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchAccept(formData) {
        try {
            console.log('------ fetchCode ------')
            const data = await apiFetch(`/group/link`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }, body: JSON.stringify(formData)
            })
            setAcceptData(data)
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
            fetchGroups,
            code,
            fetchCode,
            fetchAccept,
            acceptData,
            setGroups,
            fetchGroup
        }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    return useContext(GroupContext)
}