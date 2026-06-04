import {useEffect} from "react";

function TaskDetails() {
    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Details taak";
    }, [])

    return (
        <div>
            <p>Taak details</p>
        </div>
    )
}

export default TaskDetails