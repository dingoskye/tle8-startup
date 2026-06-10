import { Link } from "react-router";

export function MainButton({ children, link, type = "button", disabled, className, ...props }) {
    // Shared styling for both links and buttons (including your requested chunkier padding)
    const baseStyles = `
        inline-flex justify-center items-center
        bg-button-purple text-black font-headers text-xl 
        py-4 px-10 rounded-full border-white border-[6px] shadow-sm 
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