import {Link} from "react-router";

export function MainButton({ children, link, type = "button", disabled, className, ...props }) {
    // Shared styling for both links and buttons (including your requested chunkier padding)
    const baseStyles = `
        flex justify-center items-center
        bg-button-purple text-black font-headers text-xl 
        py-2 px-4 rounded-full border-white border-6 shadow-sm w-full
        transition-all hover:scale-105 outline-none 
        focus-visible:ring-4 focus-visible:ring-black/30 
        disabled:pointer-events-none disabled:opacity-50
    `.replace(/\s+/g, ' ').trim();

    // If a link prop is provided, render a clickable navigation item
    if (link) {
        return (
            <Link
                className={`${baseStyles} ${className || ''}`}
                to={link}
                {...props}
            >
                {children}
            </Link>
        );
    }

    // Otherwise, render a functional form button
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseStyles} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}

export function FormButton({children, onClick, type = "button", disabled, colorClass = "bg-button-purple"}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            /* Changed w-full to w-full sm:w-auto */
            className={`${colorClass} rounded-full py-2 px-4 border-white border-6 shadow-sm w-full sm:w-auto font-headers text-xl flex justify-center hover:scale-105 transition-transform disabled:opacity-50`}
        >
            {children}
        </button>
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

export function FunctionButton({children, f}) {
    return (
        <button
            className="bg-button-purple rounded-full py-2 px-4 border-white border-6 shadow-sm w-full font-headers text-xl flex justify-center"
            onClick={f}>
            {children}
        </button>
    )
}