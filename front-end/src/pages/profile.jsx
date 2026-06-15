import Tape from "@/components/ui/tape.jsx";
import {useTheme} from "@/context/theme-context.jsx";
import {useEffect} from "react";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {useApi} from "@/context/api-context.jsx";
import ThemeColors from "@/components/ui/theme.jsx";
import {MainButton, SubmitButton} from "@/components/ui/buttons.jsx";

function Profile() {
    const {fetchThemes, knownThemes, fetchSettings} = useTheme()
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
                <h2 className="text-2xl font-headers">Settings:</h2>
                <Card variant="secondary">
                    <h3 className="text-xl font-headers mt-2">Thema:</h3>
                    <form className="h-full flex gap-3 flex-col" onSubmit={handleSubmit}>
                        <div className="w-[70%] mx-auto">
                            <p className="text-xl font-semibold underline pb-2">Kleuren:</p>
                            {knownThemes !== null && knownThemes.length > 0 ? knownThemes.map((theme) =>
                                <div className="flex gap-4 w-full justify-between">
                                    <div className="flex gap-4">
                                        <input type="radio" id={theme.name} name="theme" value={theme.id}/>
                                        <label htmlFor={theme.name} className="text-lg">{theme.name}</label>
                                    </div>
                                    <ThemeColors theme={theme.name}/>
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <p className="text-xl font-semibold underline pb-2">Font:</p>
                            <div className="flex gap-3 justify-center">
                                <label htmlFor="written_font">Wil je een geschreven fontje?</label>
                                <input id="written_font" type="checkbox"/>
                            </div>
                        </div>
                        <div className="w-[60%] md:w-[30%] mx-auto">
                            <SubmitButton>Opslaan</SubmitButton>
                        </div>
                    </form>
                </Card>
            </TapeCard>

            <div className="w-[60%] md:w-[30%] mx-auto">
                <MainButton link={"/logout"}>Uitloggen</MainButton>
            </div>
        </>
    )
}

export default Profile