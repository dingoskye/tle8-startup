import './index.css'
import {Outlet} from "react-router";

function Layout() {
    return (
        <div className={"flex flex-col justify-between max-w-screen min-h-screen"}>
            <main className={"w-[90%] mx-auto flex flex-col gap-3 my-2 grow font-paragraph"}>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout