import {FaHome, FaPlus, FaTasks} from "react-icons/fa";
import {IoPerson} from "react-icons/io5";
import {LuInbox} from "react-icons/lu";
import {HiUserGroup} from "react-icons/hi";
import NavLinks from "@/components/nav-links.jsx";
import {useLocation} from "react-router";

function Nav({f}) {

    return (
        <nav role="navigation"
             className="bg-nav-brown min-h-[8vh] max-h-[16vh] mt-6 flex items-center justify-between px-[12vw] gap-2">
            <NavLinks variant="small" link="/studiegroepen/aanmaken"><FaPlus className="text-xl"/>
                <p className="sr-only">Groep aanmaken</p></NavLinks>
            <NavLinks variant="small" link="/hoofdtaken"><FaTasks className="text-xl"/>
                <p className="sr-only">Hoofdtaken overzicht</p></NavLinks>
            <NavLinks variant="big" link="/"><FaHome className="text-3xl"/>
                <p className="sr-only">Home</p></NavLinks>
            <button
                className="w-13 h-13 bg-button-purple rounded-full p-2 border-white border-4 shadow-sm flex items-center justify-center my-3"
                onClick={f}>
                <LuInbox className="text-xl"/>
                <p className="sr-only">Groepscode invoeren</p></button>
            <NavLinks variant="small" link="/profiel"><IoPerson className="text-xl"/>
                <p className="sr-only">Profiel</p></NavLinks>
        </nav>
    )
}

export default Nav