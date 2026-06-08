import {useEffect} from "react";

function GroupOverview() {
    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Studiegroepen";
    }, [])

    return (
        <div>
            <p>Groepen overzicht</p>
        </div>
    )
}

export default GroupOverview