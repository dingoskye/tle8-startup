import {useEffect, useState} from "react";
import TaskCard from "@/components/task-card.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {FunctionButton, MainButton} from "@/components/ui/buttons.jsx";
import {useGroup} from "@/context/group-context.jsx";
import {Link, useParams} from "react-router";
import {FaPlus} from "react-icons/fa";
import {ErrorComponent} from "@/pages/error.jsx";
import DeadlineCard from "@/components/ui/deadline-card.jsx";
import Tape from "@/components/ui/tape.jsx";
import {IoPerson} from "react-icons/io5";
import {AcceptInvite, InviteCode} from "@/components/invite-code.jsx";

function GroupDetails() {
    const {fetchGroup} = useGroup();
    const params = useParams();

    const [group, setGroup] = useState(null);
    const [showCode, setShowCode] = useState(false)

    const variants = ["primary", "secondary", "tertiary", "quaternary"];

    const loadGroup = async () => {
        const data = await fetchGroup(params.id);
        setGroup(data);
    };

    useEffect(() => {
        loadGroup();
    }, []);

    useEffect(() => {
        document.title = `Board-it | Details ${group?.name ?? ""}`;
    }, [group]);

    return (
        group !== null ?
            group.status ?
                <ErrorComponent code={group.status} message="Groep is niet beschikbaar"/> :
                <>
                    <header role="banner" className="text-center p-1 mt-1 relative">
                        <div className="bg-secondary w-full p-4 rounded-lg shadow-md">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <h1 className="text-3xl font-headers">{group.name ?? ""}</h1>
                        </div>
                    </header>
                    {group.moments !== null && group.moments.length > 0 ?
                        <Card variant="quaternary">
                            <div className="flex justify-between">
                                <p>{new Date(group.moments[0].date).toLocaleString("nl-NL", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</p>
                                <p>Locatie: {group.moments[0].location}</p>
                            </div>
                        </Card> : null}
                    <div className="w-[60%] md:w-[30%] mx-auto">
                        <MainButton link={`/moment/aanmaken/${group.id}`}>Moment plannen</MainButton>
                    </div>

                    <section aria-label="openstaande taken" className="text-center flex flex-col gap-2">
                        <Carousel className="px-6 text-left">
                            <CarouselContent className="py-4">
                                {group.main_tasks !== null && group.main_tasks?.length > 0 ? group.main_tasks.map((task, index) => (
                                    <CarouselItem key={index} className="flex md:basis-1/2 lg:basis-1/3">
                                        <Link to={`/hoofdtaken/${task.id ?? 1}`} className="w-[95%] mx-auto h-full">
                                            <Card variant="white">
                                                <div className="gap-4 mt-2 grid grid-cols-3 grow">
                                                    <div className="h-[70%]">
                                                        <DeadlineCard deadline={task.deadline}/>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <h2 className="text-xl font-headers text-left">{task.title}</h2>
                                                    </div>
                                                </div>
                                                <p>{task.description ?? "Taak heeft geen beschrijving"}</p>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                )) : (
                                    <CarouselItem className="flex">
                                        <TaskCard task={""}/>
                                    </CarouselItem>
                                )}
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>

                        <div className="w-[20%] md:w-[30%] mx-auto">
                            <MainButton link={`/hoofdtaak/aanmaken/${group.id}`}>
                                <FaPlus/>
                                <p className="sr-only">Taak aanmaken</p>
                            </MainButton>
                        </div>
                    </section>

                    <div className="min-h-[25vh]">
                        <TapeCard variant="white">
                            <h2 className="text-left text-xl font-headers">
                                Leden:
                            </h2>

                            <Carousel className="px-6 text-left">
                                <CarouselContent className="py-4">
                                    {group.users?.length > 0 ? (
                                        group.users.map((member, index) => (
                                            <CarouselItem
                                                key={member.id}
                                                className="flex basis-1/2 md:basis-1/3 lg:basis-1/5"
                                            >
                                                <Card variant={variants[index % variants.length]}>
                                                    {member.profile_image ? (
                                                        <img
                                                            src={member.profile_image}
                                                            alt={`${member.user_name} avatar`}
                                                            className="w-16 h-16 rounded-full object-cover mx-auto"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="bg-bg-white text-center items-center flex mt-3 rounded-md w-full h-16 mx-auto border-5 border-white shadow-sm">
                                                            <IoPerson
                                                                aria-label="Icoontje van poppetje (geen foto beschikbaar)"
                                                                className="text-4xl w-full"/>
                                                        </div>
                                                    )}
                                                    <p className="text-lg font-semibold mt-2 text-center">
                                                        @{member.user_name}
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
                    <div className="w-[60%] md:w-[30%] mx-auto">
                        <FunctionButton f={() => setShowCode(true)}>Code inzien</FunctionButton>
                    </div>
                    {showCode ?
                        <InviteCode f={() => setShowCode(false)}/> : null}
                </> :
            null
    );
}

export default GroupDetails;