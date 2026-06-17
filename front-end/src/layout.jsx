import './index.css'
import {Outlet, useLocation} from "react-router";
import Nav from "@/components/nav.jsx";

function Layout() {
    const location = useLocation()

    return (
        <div className={"flex flex-col justify-between max-w-screen min-h-screen"}>
            <main
                className={"w-[90%] md:w-[80%] mx-auto flex flex-col gap-3 my-2 grow font-paragraph justify-between py-2"}>
                <Outlet/>
            </main>
            {location.pathname !== '/login' && location.pathname !== '/registreren' ? <Nav/> : null}
        </div>
    )
}

export default Layout