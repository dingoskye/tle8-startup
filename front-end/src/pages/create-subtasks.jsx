import { useState, useEffect } from 'react';
import { Card, TapeCard } from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import { useApi } from "@/context/api-context.jsx";
import { Button } from "@/components/ui/button.jsx";

const CreateSubtasks = () => {

    useEffect(() => {
        document.title = "Board-it | Subtaken Aanmaken";
    }, []);

    const [subtasks, setSubtasks] = useState([
        { id: Date.now(), title: '', description: '', deadline: '' }
    ]);


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const { apiFetch } = useApi();
    const cardVariants = ["tertiary", "primary", "quaternary", "secondary"];

    const handleAddSubtask = () => {
        setSubtasks([
            ...subtasks,
            { id: Date.now(), title: '', description: '', deadline: '' }
        ]);
    };

    const handleRemoveSubtask = (idToRemove) => {
        if (subtasks.length === 1) return;
        setSubtasks(subtasks.filter(task => task.id !== idToRemove));
    };

    const handleChange = (id, field, value) => {
        const updatedSubtasks = subtasks.map(task => {
            if (task.id === id) {
                return { ...task, [field]: value };
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
            setSubmitMessage({ type: 'error', text: 'Vul tenminste één subtaak titel in!' });
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Map over the valid tasks to create an array of promises
            const requestPromises = validSubtasks.map(task => {

                // 2. Build individual FormData for EACH task
                const formData = new FormData();
                formData.append('title', task.title);
                formData.append('description', task.description);

                // Only append deadline if it exists
                if (task.deadline) {
                    formData.append('deadline', task.deadline);
                }

                formData.append('main_task_id', 1); // TODO: Replace with dynamic main_task_id
                formData.append('user_id', 1);      // TODO: Replace with dynamic user_id

                // 3. Return the apiFetch promise for the correct route
                 return apiFetch('/api/sub/create', {
                    method: 'POST',
                    body: formData,
                });
            });

            // 4. Wait for ALL requests to finish simultaneously
            const results = await Promise.all(requestPromises);

            console.log("All subtasks successfully created:", results);
            setSubmitMessage({ type: 'success', text: 'Subtaken succesvol opgeslagen!' });

            // Reset the form
            setSubtasks([{ id: Date.now(), title: '', description: '', deadline: '' }]);

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
        <>
            {/* --- HEADER SECTION (Matches Home.jsx exactly) --- */}
            <header role="banner" className="text-center p-1 mt-10 mb-5 relative w-[90%] md:w-[70%] mx-auto">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md relative">
                    <Tape variant="big-r" />
                    <Tape variant="big-l" />
                    <h1 className="text-3xl font-bold font-headers">Subtaken Aanmaken</h1>
                </div>
            </header>

            {submitMessage && (
                <div className="w-[90%] md:w-[70%] mx-auto mb-6">
                    <Card variant={submitMessage.type === 'success' ? "secondary" : "quaternary"}>
                        <div className="text-center font-bold text-lg pt-2">
                            {submitMessage.text}
                        </div>
                    </Card>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">

                {/* --- SUBTASKS LIST --- */}
                {subtasks.map((task, index) => {
                    // Pick the next color in the array based on the index
                    const currentVariant = cardVariants[index % cardVariants.length];

                    return (
                        <div key={task.id} className="w-[90%] md:w-[70%]">

                            <Card variant={currentVariant}>

                                {/* Task Header & Remove Button */}
                                <div className="flex justify-between items-center mb-4 mt-2">
                                    <h2 className="text-2xl font-bold font-headers">Subtaak #{index + 1}</h2>
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

                                        <label htmlFor={`title-${task.id}`} className="block mb-2 font-headings text-lg font-bold">
                                            Titel <span aria-hidden="true" className="text-red-600">*</span>
                                            <span className="sr-only">(Verplicht)</span>
                                        </label>

                                    <div className="relative">
                                        <Tape variant="small-r"  />
                                        <Tape variant="small-l" />
                                        <input

                                            id={`title-${task.id}`}
                                            type="text"
                                            className="w-full bg-bg-white shadow-xl/15 rounded-[3px] p-3 border border-transparent focus:border-black outline-none"
                                            placeholder="e.g. Schrijf introductie"
                                            value={task.title}
                                            
                                            onChange={(e) => handleChange(task.id, 'title', e.target.value)}
                                            required
                                        />

                                    </div>

                                    </div>

                                    {/* Description Input */}
                                    <div>
                                        <label htmlFor={`description-${task.id}`} className="block mb-2 font-headings text-lg font-bold">Beschrijving</label>

                                        <div className="relative">
                                            <Tape variant="big-r"  />
                                            <Tape variant="big-l" />
                                        <textarea
                                            id={`description-${task.id}`}
                                            className="w-full bg-bg-white shadow-xl/15 rounded-[3px] p-3 min-h-[100px] border border-transparent focus:border-black outline-none"
                                            placeholder="Details over deze taak..."
                                            value={task.description}
                                            onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                                        />
                                    </div>
                                    </div>

                                    {/* Deadline Input */}
                                    <div>
                                        <label htmlFor={`deadline-${task.id}`}  className="block mb-2 font-headings text-lg font-bold">Deadline</label>
                                        <div className="relative">
                                            <Tape variant="small-r"  />
                                            <Tape variant="small-l" />
                                        <input
                                            id={`deadline-${task.id}`}
                                            type="date"
                                            className="w-full bg-bg-white shadow-xl/15 rounded-[3px] p-3 cursor-pointer border border-transparent focus:border-black outline-none"
                                            value={task.deadline}
                                            onChange={(e) => handleChange(task.id, 'deadline', e.target.value)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}

                {/* --- ACTION BUTTONS --- */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-[90%] md:w-[70%] justify-between">

                    <Button
                        type="button"
                        variant="green"
                        size="boardit"
                        onClick={handleAddSubtask}
                    >
                        + Extra Subtaak
                    </Button>

                    <Button
                        type="submit"
                        variant="purple"
                        size="boardit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Bezig met opslaan...' : 'Alles Opslaan'}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateSubtasks;