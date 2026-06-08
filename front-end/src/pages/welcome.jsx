import Tape from "@/components/ui/tape.jsx";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {MainButton} from "@/components/ui/buttons.jsx";
import {useEffect} from "react";

function Welcome() {
    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Welkom";
    }, []);

    return (
        <>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-quaternary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-4xl font-headers">Welkom bij Board-it!</h1>
                    <p className="text-xl">{new Date().toLocaleDateString('nl-Nl', {
                        day: "numeric", month: "long", year: "numeric"
                    })}</p>
                </div>
            </header>

            <TapeCard kind="s" variant="secondary">
                <p className="text-2xl text-center w-full pt-4">Nooit meer wachten tot het laatste moment!</p>
            </TapeCard>
            <TapeCard kind="s" variant="tertiary">
                <p className="text-2xl text-center w-full pt-4">Geef jezelf deadlines die echt werken!</p>
            </TapeCard>
            <Card kind="s" variant="primary">
                <p className="text-2xl text-center w-full pt-4">Ga de strijd aan tegen je klasgenoten en laat zien dat
                    jij de beste bent!</p>
            </Card>

            <div className="w-[45%] mx-auto">
                <MainButton link="/">Begin nu!</MainButton>
            </div>
        </>
    )
}

export default Welcome