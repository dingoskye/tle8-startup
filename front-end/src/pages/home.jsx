import TaskCard from "../components/task-card.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import Tape from "@/components/ui/tape.jsx";
import {MainButton} from "@/components/ui/buttons.jsx";
import {useEffect} from "react";
import {TapeCard} from "@/components/ui/cards.jsx";
import GroupCard from "@/components/group-card.jsx";
import {useMainTask} from "@/context/task-context.jsx";
import {useGroup} from "@/context/group-context.jsx";

function Home() {
    const {fetchMainTasks, mainTasks} = useMainTask()
    const {fetchGroups, groups} = useGroup()

    const variants = [
        "secondary",
        "tertiary",
        "quaternary",
        "primary",
    ];

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Home";
        fetchMainTasks()
        fetchGroups()
    }, []);

    return (
        <>
            <header role="banner" className="text-center p-1 mt-1 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Welkom John Doe</h1>
                </div>
            </header>

            <section aria-label="openstaande taken" className="text-center flex flex-col gap-2">
                {/*task carousel*/}
                <Carousel className="px-6 text-left">
                    <CarouselContent className="py-4">
                        {mainTasks !== null && mainTasks.length !== 0 ? mainTasks.map((task, index) =>
                            <CarouselItem key={index} className="flex md:basis-1/2 lg:basis-1/3">
                                <TaskCard task={task}/>
                            </CarouselItem>
                        ) : <CarouselItem className="flex">
                            <TaskCard task={""}/>
                        </CarouselItem>}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>

                <div className="w-[60%] md:w-[30%] mx-auto">
                    <MainButton link="/hoofdtaken">Taken bekijken</MainButton>
                </div>
            </section>

            <div className="min-h-[25vh]">
                <TapeCard variant="white">
                    <h2 className="text-left text-xl font-headers">Studiegroepen:</h2>
                    <Carousel className="px-6 text-left">
                        <CarouselContent className="py-4">
                            {groups !== null && groups.length !== 0 ? groups.map((group, index) =>
                                <CarouselItem key={index} className="flex basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <GroupCard key={index} group={group} variant={variants[index % variants.length]}/>
                                </CarouselItem>
                            ) : <CarouselItem className="flex">
                                <p className="pt-4 text-xl text-center w-full">Geen groepen</p>
                            </CarouselItem>}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </TapeCard>
            </div>
        </>
    )
}

export default Home