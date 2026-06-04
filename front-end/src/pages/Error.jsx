import Tape from "@/components/ui/tape.jsx";
import {TapeCard} from "@/components/ui/cards.jsx";

function ErrorPage({code, message}) {
    return (
        <div className="flex gap-8 flex-col grow justify-center">
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-6xl font-headers p-2">{code}</h1>
                </div>
            </header>
            <TapeCard variant="secondary">
                <p className="text-3xl p-4">{message}</p>
            </TapeCard>
        </div>
    )
}

export default ErrorPage