import {useState, useEffect} from 'react';
import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {Button} from "@/components/ui/button.jsx";

const CreateSubtasks = () => {
    useEffect(() => {
        document.title = "Board-it | Create Subtasks";
    }, []);

    const [subtasks, setSubtasks] = useState([
        {id: Date.now(), name: '', description: '', deadline: ''}
    ]);

    const handleAddSubtask = () => {
        setSubtasks([
            ...subtasks,
            {id: Date.now(), name: '', description: '', deadline: ''}
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validSubtasks = subtasks.filter(task => task.name.trim() !== "");
        if (validSubtasks.length === 0) {
            alert("Please fill out at least one subtask name!");
            return;
        }
        console.log("Ready to send:", validSubtasks);
    };

    return (
        <main className="pb-10">
            {/* Header matches the style in Home.jsx */}
            <header role="banner" className="text-center p-1 mt-10 mb-10 relative">
                <div className="bg-primary w-[70%] mx-auto p-4 rounded-lg shadow-md relative">
                    <h1 className="text-3xl font-bold font-headers">Add Subtasks</h1>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">

                {/* Wrap the subtasks in a TapeCard like the Groups section in Home */}
                <div className="w-[70%]">
                    <TapeCard variant="white">
                        <div className="flex flex-col gap-6">
                            {subtasks.map((task, index) => (
                                <Card key={task.id} variant="tertiary">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-bold font-headers">Subtask #{index + 1}</h2>
                                        {subtasks.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveSubtask(task.id)}
                                            >
                                                Verwijder
                                            </Button>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <input
                                            className="w-full bg-white/50 p-2 rounded border border-black/10"
                                            placeholder="Naam"
                                            value={task.name}
                                            onChange={(e) => handleChange(task.id, 'name', e.target.value)}
                                            required
                                        />
                                        <textarea
                                            className="w-full bg-white/50 p-2 rounded border border-black/10"
                                            placeholder="Beschrijving"
                                            value={task.description}
                                            onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            className="w-full bg-white/50 p-2 rounded border border-black/10"
                                            value={task.deadline}
                                            onChange={(e) => handleChange(task.id, 'deadline', e.target.value)}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TapeCard>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button type="button" variant="secondary" onClick={handleAddSubtask}>
                        + Extra Subtaak
                    </Button>
                    <Button type="submit">
                        Alles Opslaan
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default CreateSubtasks;