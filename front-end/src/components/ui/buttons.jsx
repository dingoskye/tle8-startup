import {Link} from "react-router";

export function MainButton({children, link}) {
    return (
        <Link
            className="bg-button-purple rounded-full py-2 px-4 border-white border-6 shadow-sm w-full font-headers text-xl flex justify-center"
            to={link}>
            {children}
        </Link>
    )
}


export function SubmitButton({children}) {
    return (
        <button className="bg-button-purple rounded-full py-2 px-4 border-white border-6 shadow-sm w-full font-headers
            text-xl flex justify-center" typeof="submit">
            {children}

        </button>
    )
}