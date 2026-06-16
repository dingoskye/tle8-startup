import {useEffect, useState} from "react";
import Tape from "@/components/ui/tape.jsx";
import TaskCard from "@/components/task-card.jsx";
import {useMainTask} from "@/context/task-context.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {MainButton} from "@/components/ui/buttons.jsx";
import {useGroup} from "@/context/group-context.jsx";
import {useParams} from "react-router";

function GroupDetails() {
    const {fetchMainTasks, mainTasks} = useMainTask();
    const {fetchGroup} = useGroup();
    const params = useParams();
    const [group, setGroup] = useState(params.id);

    const loadGroup = async () => {
        const data = await fetchGroup(params.id);
        setGroup(data);
    }

    const tasksForGroup = mainTasks
        ? mainTasks.filter(
            task => Number(task.group_id) === Number(params.id)
        )
        : [];

    const members = group?.users ?? [];

    const variants = ["secondary", "tertiary", "quaternary", "primary"];


    useEffect(() => {
        document.title = "Board-it | Studiegroepen";
        console.log("fetching data");

        loadGroup();
        fetchMainTasks();
    }, []);

    console.log("groups:", group);


    return (
        <div>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-secondary p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Groep Overzicht</h1>
                </div>
            </header>

            <section aria-label="openstaande taken" className="text-center flex flex-col gap-2 mb-8">
                <Carousel className="px-6 text-left">
                    <CarouselContent className="py-4">

                        {tasksForGroup.length > 0 ? (
                            tasksForGroup.map((task, index) =>
                                <CarouselItem
                                    key={task.id ?? index}
                                    className="flex md:basis-1/2 lg:basis-1/3"
                                >
                                    <TaskCard task={task}/>
                                </CarouselItem>
                            )
                        ) : (
                            <CarouselItem className="flex">
                                <TaskCard task={""}/>
                            </CarouselItem>
                        )}

                    </CarouselContent>

                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </section>

            <div className="min-h-[25vh]">
                <TapeCard variant="white">
                    <section aria-label="leden" className="text-center mb-8">
                        <div>
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <h2 className="text-left text-xl font-headers">
                                Leden:
                            </h2>
                        </div>

                        <Carousel className="px-6 text-left mt-4">
                            <CarouselContent className="py-4">
                                {members.length > 0 ? (
                                    members.map((member, i, index) => (

                                        member ? (
                                            <CarouselItem
                                                key={member.id ?? i ?? index}
                                                className="flex md:basis-1/2 lg:basis-1/3"
                                            >
                                                <Card key={index}
                                                      variant={variants[index % variants.length]}>
                                                    {member.profile_image ? (
                                                        <img
                                                            src={member.profile_image}
                                                            alt={`${member.user_name ?? 'User'} avatar`}
                                                            className="w-16 h-16 rounded-full object-cover mx-auto"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="w-16 h-16 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-sm font-semibold">
                                                            {(member.user_name || '').split(' ').map(n => n?.[0]).slice(0, 2).join('') || '?'}
                                                        </div>
                                                    )}

                                                    <h3 className="text-lg font-semibold mt-2 text-center">
                                                        {member.user_name}
                                                    </h3>
                                                    <p className="text-center">
                                                        {member.email}
                                                    </p>
                                                    <p className="text-center">
                                                        Rol: {member.pivot?.role ?? '-'}
                                                    </p>
                                                </Card>
                                            </CarouselItem>
                                        ) : null
                                    ))
                                ) : (
                                    <CarouselItem className="flex">
                                        <Card>
                                            <p className="text-left">
                                                Geen leden gevonden.
                                            </p>
                                        </Card>
                                    </CarouselItem>
                                )}
                            </CarouselContent>

                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>

                        <div className="w-[60%] md:w-[30%] mx-auto mt-4">
                            <MainButton link="/hoofdtaken">
                                Leden bekijken
                            </MainButton>
                        </div>
                    </section>
                </TapeCard>
            </div>

        </div>
    );
}

export default GroupDetails;