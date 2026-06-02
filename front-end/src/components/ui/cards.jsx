import {useState} from "react";
import Punaise from "@/components/ui/punaise.jsx";

function Card({variant, children}) {
    let style = "shadow-md rounded-lg p-4 w-full h-full mx-auto relative flex flex-col gap-3 mt-2"

    switch (variant) {
        case "white":
            style += " bg-white";
            break;
        case "primary":
            style += " bg-primary";
            break;
    }

    return (
        <article className={style}>
            <Punaise/>
            {children}
        </article>
    );
}

export default Card