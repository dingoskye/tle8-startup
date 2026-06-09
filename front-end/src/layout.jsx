import './index.css'
import {Outlet, useLocation} from "react-router";
import Nav from "@/components/nav.jsx";

function Layout() {
    const location = useLocation()

    return (
        <div className={"flex flex-col justify-between max-w-screen min-h-screen"}>
            <main className={"w-[90%] mx-auto flex flex-col gap-5 my-2 grow font-paragraph justify-between py-2"}>
                <Outlet/>
            </main>
            {location.pathname !== '/login' && location.pathname !== '/register' ? <Nav/> : null}
        </div>
    )
}

export default Layout