import {FaHome, FaPlus, FaTasks} from "react-icons/fa";
import {IoPerson} from "react-icons/io5";
import {LuInbox} from "react-icons/lu";
import {HiUserGroup} from "react-icons/hi";
import NavLinks from "@/components/nav-links.jsx";
import {useLocation} from "react-router";

function Nav() {
    const location = useLocation();

    return (
        location.pathname === "/" ?
            <nav role="navigation"
                 className="bg-nav-brown min-h-[8vh] max-h-[16vh] mt-6 flex items-center justify-between px-[12vw] gap-2">
                <NavLinks variant="small" link="/"><FaHome className="text-xl"/></NavLinks>
                <NavLinks variant="small" link="/hoofdtaken"><FaTasks className="text-xl"/></NavLinks>
                <NavLinks variant="big" link="/hoofdtaak/aanmaken"><FaPlus className="text-3xl"/></NavLinks>
                <NavLinks variant="small" link="/accepteren"><LuInbox className="text-xl"/></NavLinks>
                <NavLinks variant="small" link="/"><IoPerson className="text-xl"/></NavLinks>
            </nav> :
            <nav role="navigation"
                 className="bg-nav-brown min-h-[8vh] max-h-[16vh] mt-6 flex items-center justify-between px-[12vw] gap-2">
                <NavLinks variant="small" link="/hoofdtaak/aanmaken"><FaPlus className="text-xl"/></NavLinks>
                <NavLinks variant="small" link="/hoofdtaken"><FaTasks className="text-xl"/></NavLinks>
                <NavLinks variant="big" link="/"><FaHome className="text-3xl"/></NavLinks>
                <NavLinks variant="small" link="/accepteren"><LuInbox className="text-xl"/></NavLinks>
                <NavLinks variant="small" link="/"><IoPerson className="text-xl"/></NavLinks>
            </nav>
    )
}

export default Nav