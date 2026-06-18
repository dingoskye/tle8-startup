import './index.css'
import {Outlet, useLocation} from "react-router";
import Nav from "@/components/nav.jsx";
import {useState} from "react"
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {SubmitButton} from "@/components/ui/buttons.jsx";
import PopUp from "@/components/pop-up.jsx";
import {AcceptInvite} from "@/components/invite-code.jsx";

function Layout() {
    const location = useLocation()
    const [showAccept, setShowAccept] = useState(false)


    return (
        <>
            <div className={"flex flex-col justify-between max-w-screen min-h-screen"}>
                <main
                    className={"w-[90%] md:w-[80%] mx-auto flex flex-col gap-3 my-2 grow font-paragraph justify-between py-2"}>
                    <Outlet/>
                </main>
                {location.pathname !== '/login' && location.pathname !== '/registreren' && location.pathname !== '/welkom' ?
                    <Nav f={() => setShowAccept(true)}/> : null}
            </div>
            {showAccept ?
                <AcceptInvite f={() => setShowAccept(false)}/> : null}
        </>
    )
}

export default Layout