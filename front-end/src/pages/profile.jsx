import Tape from "@/components/ui/tape.jsx";
import {useTheme} from "@/context/theme-context.jsx";
import {useEffect} from "react";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {useApi} from "@/context/api-context.jsx";
import ThemeColors from "@/components/ui/theme.jsx";
import {MainButton, SubmitButton} from "@/components/ui/buttons.jsx";

function Profile() {
    const {fetchThemes, knownThemes, fetchSettings, settings} = useTheme()
    const {loginData, getData} = useApi()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetchThemes()
        fetchSettings()
        getData()
    }, []);

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
                <form className="h-full flex gap-4 flex-col" onSubmit={handleSubmit}>
                    <Card variant="secondary">
                        <h3 className="text-xl font-headers mt-2">Kleuren:</h3>
                        {knownThemes !== null && knownThemes.length > 0 ? knownThemes.map((theme) =>
                            <div className="flex gap-4 w-full justify-between">
                                <div className="flex gap-4">
                                    <input type="radio" id={theme.name} name="theme"
                                           value={theme.id}
                                           checked={settings ? settings.theme.name === theme.name : null}/>
                                    <label htmlFor={theme.name} className="text-lg">{theme.name}</label>
                                </div>
                                <ThemeColors theme={theme.name}/>
                            </div>
                        ) : null}
                    </Card>
                    <Card variant="tertiary">
                        <h3 className="text-xl font-headers mt-2">Text:</h3>
                        <div className="flex gap-3 justify-center">
                            <label htmlFor="written_font" className="text-lg">Wil je een geschreven fontje?</label>
                            <input id="written_font" type="checkbox"
                                   checked={settings ? settings.written_font : null}/>
                        </div>
                    </Card>
                    <div className="w-[60%] md:w-[30%] mx-auto">
                        <SubmitButton>Opslaan</SubmitButton>
                    </div>
                </form>
            </TapeCard>

            <div className="w-[60%] md:w-[30%] mx-auto">
                <MainButton link={"/logout"}>Uitloggen</MainButton>
            </div>
        </>
    )
}

export default Profile