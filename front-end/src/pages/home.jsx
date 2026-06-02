import TaskCard from "../components/task-card.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import Tape from "@/components/ui/tape.jsx";
import {MainButton} from "@/components/ui/buttons.jsx";
import {useEffect} from "react";

function Home() {
    //tijdelijke data
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
            deadline: "15 januari",
            group: "Team 4",
            subtasks: {
                todo: "Physics toegepast in de game.",
                done: "Collision detection toegepast."
            }
        }]

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Home";
    }, []);

    return (
        <>
            <section className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Welkom John Doe</h1>
                </div>
            </section>

            <section className="text-center flex flex-col gap-5">
                {/*task carousel*/}
                <Carousel className="px-6 text-left">
                    <CarouselContent className="py-4">
                        {tasks.map((task, index) =>
                            <CarouselItem key={index} className="flex md:basis-1/2 lg:basis-1/3">
                                <TaskCard task={task}/>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>

                <div className="w-[60%] mx-auto">
                    <MainButton link="/tasks">Taken bekijken</MainButton>
                </div>
            </section>

        </>
    )
}

export default Home