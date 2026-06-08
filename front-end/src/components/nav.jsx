import {FaPlus, FaTasks} from "react-icons/fa";
import {IoPerson} from "react-icons/io5";
import {LuInbox} from "react-icons/lu";
import {HiUserGroup} from "react-icons/hi";
import NavLinks from "@/components/nav-links.jsx";

function Nav() {
    return (
        <nav role="navigation"
             className="bg-nav-brown h-[8vh] mt-3 flex items-center justify-between px-[12vw] gap-2">
            <NavLinks variant="small" link="/"><LuInbox className="text-xl"/></NavLinks>
            <NavLinks variant="small" link="/"><IoPerson className="text-xl"/></NavLinks>
            <NavLinks variant="big" link="/"><FaPlus className="text-3xl"/></NavLinks>
            <NavLinks variant="small" link="/hoofdtaken"><FaTasks className="text-xl"/></NavLinks>
            <NavLinks variant="small" link="/studiegroepen"><HiUserGroup className="text-xl"/></NavLinks>
        </nav>
    )
}

export default Nav