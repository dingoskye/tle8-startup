import Tape from "@/components/ui/tape.jsx";
import {useTheme} from "@/context/theme-context.jsx";
import {useEffect, useState} from "react";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {useApi} from "@/context/api-context.jsx";
import ThemeColors from "@/components/ui/theme.jsx";
import {FunctionButton, MainButton, SubmitButton} from "@/components/ui/buttons.jsx";
import {useNavigate} from "react-router";
import {useLogin} from "@/context/login-context.jsx";
import {useMainTask} from "@/context/task-context.jsx";
import {useGroup} from "@/context/group-context.jsx";

function Profile() {
    const {fetchThemes, knownThemes, fetchSettings, settings, saveSettings} = useTheme()
    const {loginData, getData} = useApi()
    const {logout} = useLogin()
    const {setMainTasks} = useMainTask()
    const {setGroups} = useGroup()
    const {setTheme, setFont} = useTheme()
    const [done, setDone] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        theme_id: 1,
        written_font: false
    });
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await saveSettings(formData)
        // console.log(res)
        if (res.id) {
            setDone(true)
        } else {
            setError("Er is iets fout gegaan")
        }
    }

    const loggingOut = async () => {
        await logout()
        setMainTasks(null)
        setGroups(null)
        setTheme("theme-default")
        setFont("font-default")
        navigate("/welkom")
    }

    useEffect(() => {
        document.title = "Board-it | Profiel";
        fetchThemes()
        fetchSettings()
        getData()
    }, []);

    useEffect(() => {
        if (settings) {
            setFormData({
                theme_id: settings.theme.id,
                written_font: settings.written_font
            });
        }
    }, [settings])

    return (
        <>
            <header role="banner" className="text-center p-1 mt-1 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-3xl font-headers">Welkom {loginData?.name ?? ""}</h1>
                </div>
            </header>

            <TapeCard variant="white">
                <h2 className="text-2xl font-headers mb-2">Settings:</h2>
                {done ? <p>Settings opgeslagen!</p> : null}
                {error ? <p>{error}</p> : null}
                <form className="h-full flex gap-4 flex-col" onSubmit={handleSubmit}>
                    <Card variant="secondary">
                        <h3 className="text-xl font-headers mt-2">Kleuren:</h3>
                        {knownThemes !== null && knownThemes.length > 0 ? knownThemes.slice(0, 3).map((theme) =>
                            <div className="flex gap-4 w-full justify-between">
                                <div className="flex gap-4">
                                    <input type="radio" id={theme.name} name="theme"
                                           value={theme.id}
                                           checked={formData.theme_id === theme.id}
                                           onChange={(e) =>
                                               setFormData({
                                                   ...formData,
                                                   theme_id: Number(e.target.value)
                                               })
                                           }/>
                                    <label htmlFor={theme.name} className="text-lg">{theme.name}</label>
                                </div>
                                <ThemeColors theme={theme.name}/>
                            </div>
                        ) : null}
                    </Card>
                    <Card variant="tertiary">
                        <h3 className="text-xl font-headers mt-2">Tekst:</h3>
                        <div className="flex gap-3 justify-center">
                            <label htmlFor="written_font" className="text-lg">Wil je een geschreven fontje?</label>
                            <input id="written_font" type="checkbox"
                                   checked={formData.written_font}
                                   onChange={(e) =>
                                       setFormData({
                                           ...formData,
                                           written_font: e.target.checked
                                       })
                                   }/>
                        </div>
                    </Card>
                    <div className="w-[60%] md:w-[30%] mx-auto">
                        <SubmitButton>Opslaan</SubmitButton>
                    </div>
                </form>
            </TapeCard>

            <div className="w-[60%] md:w-[30%] mx-auto">
                <FunctionButton f={loggingOut}>Uitloggen</FunctionButton>
            </div>
        </>
    )
}

export default Profile