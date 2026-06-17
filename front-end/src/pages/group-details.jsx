import {useEffect, useState} from "react";
import TaskCard from "@/components/task-card.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {MainButton} from "@/components/ui/buttons.jsx";
import {useGroup} from "@/context/group-context.jsx";
import {useParams} from "react-router";
import {FaPlus} from "react-icons/fa";

function GroupDetails() {
    const {fetchGroup} = useGroup();
    const params = useParams();

    const [group, setGroup] = useState(null);

    const variants = ["secondary", "tertiary", "quaternary", "primary"];

    const loadGroup = async () => {
        const data = await fetchGroup(params.id);
        setGroup(data);
    };

    useEffect(() => {
        document.title = "Board-it | Studiegroepen";

        loadGroup();
    }, []);


    if (!group) {
        return (
            <p className="text-center mt-10">
                Groep niet gevonden.
            </p>
        );
    }


    return (
        <div>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-secondary p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-headers">
                        Groep Overzicht: {group.id}
                    </h1>
                </div>
            </header>


            <section aria-label="openstaande taken" className="text-center flex flex-col gap-2 mb-8">
                <Carousel className="px-6 text-left">
                    <CarouselContent className="py-4">

                        {group.main_tasks?.length > 0 ? (
                            group.main_tasks.map((task) =>
                                <CarouselItem
                                    key={task.id}
                                    className="flex md:basis-1/2 lg:basis-1/3"
                                >
                                    <TaskCard
                                        task={{
                                            ...task,
                                            group: group,
                                            sub_tasks: task.sub_tasks ?? [],
                                            users: task.users?.length
                                                ? task.users
                                                : [{pivot: {progress: 0}}]
                                        }}
                                    />
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


                <div className="w-[60%] md:w-[30%] mx-auto mt-4">
                    <MainButton link="/taak-aanmaken">
                        <FaPlus/>
                    </MainButton>
                </div>

            </section>


            <div className="min-h-[25vh]">
                <TapeCard variant="white">

                    <h2 className="text-left text-xl font-headers">
                        Leden:
                    </h2>


                    <Carousel className="px-6 text-left mt-4">
                        <CarouselContent className="py-4">

                            {group.users?.length > 0 ? (
                                group.users.map((member, index) => (

                                    <CarouselItem
                                        key={member.id}
                                        className="flex md:basis-1/2 lg:basis-1/3"
                                    >

                                        <Card
                                            variant={variants[index % variants.length]}
                                        >

                                            {member.profile_image ? (
                                                <img
                                                    src={member.profile_image}
                                                    alt={`${member.user_name} avatar`}
                                                    className="w-16 h-16 rounded-full object-cover mx-auto"
                                                />
                                            ) : (
                                                <div
                                                    className="w-16 h-16 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-sm font-semibold"
                                                >
                                                    {(member.user_name || '')
                                                        .split(' ')
                                                        .map(n => n[0])
                                                        .slice(0, 2)
                                                        .join('') || '?'}
                                                </div>
                                            )}

                                            <p className="text-lg font-semibold mt-2 text-center">
                                                {member.user_name}
                                            </p>

                                        </Card>

                                    </CarouselItem>

                                ))
                            ) : (
                                <CarouselItem>
                                    <Card>
                                        Geen leden gevonden.
                                    </Card>
                                </CarouselItem>
                            )}

                        </CarouselContent>

                        <CarouselPrevious/>
                        <CarouselNext/>

                    </Carousel>

                </TapeCard>
            </div>

        </div>
    );
}

export default GroupDetails;