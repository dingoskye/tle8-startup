import {Link} from "react-router";

export function MainButton({children, link}) {
    return (
        <Link
            className="bg-button-purple rounded-full py-2 px-4 border-white border-6 shadow-sm w-full sm:w-auto font-headers text-xl flex justify-center"
            to={link}>
            {children}
        </Link>
    )
}

export function FormButton({children, onClick, type = "button", disabled, colorClass = "bg-button-purple"}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            /* Changed w-full to w-full sm:w-auto */
            className={`${colorClass} rounded-full py-2 px-8 border-white border-6 shadow-sm w-full sm:w-auto font-headers text-xl flex justify-center hover:scale-105 transition-transform disabled:opacity-50`}
        >
            {children}
        </button>
    )
}