import TaskCard from "../components/task-card.jsx";

function Home() {
    const tasks = [{
        title: "Techniek filosofie 4",
        deadline: "10 juni",
        group: "Team 4",
        subtasks: {
            todo: "Pitch in elkaar zetten.",
            done: "Social impact onderbouwt."
        }
    },
        {
            title: "Programmeren 4",
            deadline: "15 juni",
            group: "Team 4",
            subtasks: {
                todo: "Physics toegepast in de game.",
                done: "Collision detection toegepast."
            }
        }]

    return (
        <>
            <section className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-lg">
                    <div className="w-14 h-3 absolute translate-x-1/4 rotate-45 top-2 right-0 bg-nav-brown"/>
                    <div className="w-14 h-3 absolute -translate-x-1/4 rotate-45 bottom-2 left-0 bg-nav-brown"/>
                    <h1 className="text-2xl font-headers">Welkom John Doe</h1>
                </div>
            </section>

            {/*task carousel*/}
            <section>
                {tasks.map((task) =>
                    <TaskCard task={task}/>
                )}
            </section>
        </>
    )
}

export default Home