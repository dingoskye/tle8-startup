import Tape from "@/components/ui/tape.jsx";
import {TapeCard, Card} from "@/components/ui/cards.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MainButton, SubmitButton} from "@/components/ui/buttons.jsx";

function Login() {
    return (
        <>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Inloggen</h1>
                </div>
            </header>
            <div className="min-h-[25vh]">
                <Card variant="quaternary">
                    <h2 className="text-left text-xl font-headers mb-2">Email:</h2>
                    <TapeCard variant="white">

                    </TapeCard>
                </Card>
            </div>

            <div className="min-h-[25vh]">

                <Card variant="primary">
                    <h2 className="text-left text-xl font-headers mb-2">Wachtwoord:</h2>
                    <TapeCard variant="white">

                    </TapeCard>
                </Card>
            </div>
            <SubmitButton>
                Login
            </SubmitButton>


        </>
    )
}

export default Login