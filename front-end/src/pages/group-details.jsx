import {useEffect} from "react";

function GroupDetails() {
    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Details groep";
    }, [])

    return (
        <div>
            <p>Taak details</p>
        </div>
    )
}

export default GroupDetails