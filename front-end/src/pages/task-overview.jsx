import {useEffect} from "react";

function TaskOverview() {
    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Takenoverzicht";
    }, [])

    return (
        <div>
            <p>Taak overzicht</p>
            
        </div>
    )
}

export default TaskOverview