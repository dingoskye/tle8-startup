import {Link} from "react-router";

function NavLinks({variant, link, children}) {
    let style = "bg-button-purple rounded-full p-2 border-white border-4 shadow-sm flex items-center justify-center my-3"

    switch (variant) {
        case "big" :
            style += " w-15 h-15"
            break
        case "small":
            style += " w-13 h-13"
            break
    }

    return (
        <Link className={style} to={link}>{children}</Link>
    )
}

export default NavLinks