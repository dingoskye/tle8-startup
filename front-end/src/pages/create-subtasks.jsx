import {useState, useEffect} from 'react';
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import {useApi} from "@/context/api-context.jsx";
import {Button} from "@/components/ui/button.jsx";
import {FormButton} from "@/components/ui/buttons.jsx";
import {useParams, useNavigate} from 'react-router';
import {ErrorComponent} from "@/pages/error.jsx";
import {useMainTask} from "@/context/task-context.jsx";

const currentUser = {id: '1', name: 'Jij', user_name: 'mijn_account'}; // Using this until login is implemented

const CreateSubtasks = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {fetchTaskDetails} = useMainTask()
    const {apiFetch, token} = useApi();
    const [mainTask, setMainTask] = useState(null);
    const [isLoadingTask, setIsLoadingTask] = useState(true);

    const [subtasks, setSubtasks] = useState([
        {id: Date.now(), title: '', description: '', deadline: ''}
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const cardVariants = ["tertiary", "primary", "quaternary", "secondary"];
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    const maxDateString = maxDate.toISOString().split('T')[0];

    // --- 2. FIXED: Clean, un-nested useEffect for fetching data ---
    const loadTask = async () => {
        try {
            const taskData = await fetchTaskDetails(id)
            setMainTask(taskData);
            document.title = `Board-it | Subtaken maken voor ${taskData.title}`;
            setIsLoadingTask(false);
        } catch (error) {
            console.error("Task not found:", error);
            // Redirect to a fake route to trigger your 404 page
            // navigate('/404', {replace: true});
        }
    };

    useEffect(() => {
        loadTask();
    }, [id]);


    if (isLoadingTask) {
        return (
            <div className="w-full flex justify-center mt-20">
                <p className="text-xl font-bold font-headers">Taak gegevens ophalen...</p>
            </div>
        );
    }

    const handleAddSubtask = () => {
        setSubtasks([
            ...subtasks,
            {id: Date.now(), title: '', description: '', deadline: ''}
        ]);
    };

    const handleRemoveSubtask = (idToRemove) => {
        if (subtasks.length === 1) return;
        setSubtasks(subtasks.filter(task => task.id !== idToRemove));
    };

    const handleChange = (id, field, value) => {
        const updatedSubtasks = subtasks.map(task => {
            if (task.id === id) {
                return {...task, [field]: value};
            }
            return task;
        });
        setSubtasks(updatedSubtasks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage(null);

        // Filter using 'title' now!
        const validSubtasks = subtasks.filter(task => task.title.trim() !== "");
        if (validSubtasks.length === 0) {
            setSubmitMessage({type: 'error', text: 'Vul tenminste één subtaak titel in!'});
            return;
        }

        setIsSubmitting(true);

        try {

            const requestPromises = validSubtasks.map(task => {


                const formData = new FormData();
                formData.append('title', task.title);
                formData.append('description', task.description);


                if (task.deadline) {
                    formData.append('deadline', task.deadline);
                }


                formData.append('main_task_id', id);
                formData.append('user_id', currentUser.id); // todo: moet gelink worden met de log in user, het gebruik nu beide mock data

                // 3. Return the apiFetch promise for the correct route
                return apiFetch('/sub/create', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
            });

            // 4. Wait for ALL requests to finish simultaneously
            const results = await Promise.all(requestPromises);

            console.log("All subtasks successfully created:", results);
            setSubmitMessage({type: 'success', text: 'Subtaken succesvol opgeslagen!'});

            setTimeout(() => {
                // This sends them back to the specific details page for this main task:
                navigate(`/hoofdtaken/${id}`);

                // (Note: If you want to send them to the general list instead, use navigate('/hoofdtaken'); )
            }, 2000);


        } catch (error) {
            console.error("Error submitting subtasks:", error);
            setSubmitMessage({
                type: 'error',
                text: 'Er is een fout opgetreden bij het opslaan. Probeer het opnieuw.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        mainTask?.status ? <ErrorComponent code={mainTask.status} message="Taak is niet beschikbaar"/> :
            <>
                {/* --- HEADER SECTION --- */}
                <header role="banner" className="text-center p-1 relative w-full">
                    <div className="bg-primary w-full p-4 rounded-lg shadow-md relative">
                        <Tape variant="big-r"/>
                        <Tape variant="big-l"/>
                        <h1 className="text-3xl font-headers">Subtaken Aanmaken</h1>

                        {/* --- Added the task title here! --- */}
                        <p className="text-lg font-bold mt-2 border-t border-black/20 pt-2">
                            Voor taak: <span className="italic">{mainTask.title}</span>
                        </p>
                    </div>
                </header>

                {submitMessage && (
                    <div className="  mx-auto mb-6">
                        <Card variant={submitMessage.type === 'success' ? "secondary" : "quaternary"}>
                            <div className="text-center font-bold text-lg pt-2">
                                {submitMessage.text}
                            </div>
                        </Card>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 w-full">

                    {/* --- SUBTASKS LIST --- */}
                    {subtasks.map((task, index) =>
                        <Card variant={cardVariants[index % cardVariants.length]}>

                            {/* Task Header & Remove Button */}
                            <div className="flex justify-between items-center mb-4 mt-2">
                                <h2 className="text-2xl font-headers">Subtaak #{index + 1}</h2>
                                {subtasks.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="boardit-white"
                                        size="boardit-sm"
                                        onClick={() => handleRemoveSubtask(task.id)}
                                        aria-label={`Verwijder subtaak ${index + 1}`}
                                    >
                                        Verwijder
                                    </Button>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 ">
                                {/* Titel Input */}
                                <div>
                                    <label htmlFor={`title-${task.id}`}
                                           className="block mb-2 font-headings text-lg font-bold">
                                        Titel <span aria-hidden="true" className="text-red-600">*</span>
                                        <span className="sr-only">(Verplicht)</span>
                                    </label>

                                    <div className="relative">
                                        <Tape variant="small-r"/>
                                        <Tape variant="small-l"/>
                                        <input
                                            id={`title-${task.id}`}
                                            type="text"
                                            className="w-full bg-bg-white shadow-xl/5 rounded-[3px] p-3 border border-transparent focus:border-black outline-none"
                                            placeholder="e.g. doel van de sub-taak"
                                            value={task.title}
                                            maxLength={500}
                                            onChange={(e) => handleChange(task.id, 'title', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label htmlFor={`description-${task.id}`}
                                           className="block mb-2 font-headings text-lg font-bold">Beschrijving</label>

                                    <div className="relative">
                                        <Tape variant="small-r"/>
                                        <Tape variant="small-l"/>
                                        <textarea
                                            id={`description-${task.id}`}
                                            className="w-[100%] bg-bg-white shadow-xl/7 rounded-[2%] p-[5%] min-h-[25%] border border-transparent focus:border-black outline-none"
                                            placeholder="Details over deze taak..."
                                            value={task.description}
                                            maxLength={4000}
                                            onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Deadline Input */}
                                <div>
                                    <label htmlFor={`deadline-${task.id}`}
                                           className="block mb-2 font-headings text-lg font-bold">Deadline</label>
                                    <div className="relative">
                                        <Tape variant="small-r"/>
                                        <Tape variant="small-l"/>
                                        <input
                                            id={`deadline-${task.id}`}
                                            type="date"
                                            className="w-full bg-bg-white shadow-xl/7 rounded-[3px] p-3 cursor-pointer border border-transparent focus:border-black outline-none"
                                            value={task.deadline}
                                            onChange={(e) => handleChange(task.id, 'deadline', e.target.value)}
                                            min={today}
                                            max={maxDateString}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}


                    {/* --- ACTION BUTTONS --- */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                        <FormButton
                            type="button"
                            colorClass="bg-secondary" // Makes it green
                            onClick={handleAddSubtask}
                        >
                            + Extra Subtaak
                        </FormButton>

                        <FormButton
                            type="submit"
                            colorClass="bg-button-purple" // Makes it purple
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Bezig met opslaan...' : 'Alles Opslaan'}
                        </FormButton>
                    </div>
                </form>
            </>
    );
};

export default CreateSubtasks;