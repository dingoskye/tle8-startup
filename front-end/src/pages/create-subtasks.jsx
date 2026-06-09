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
        <main>
            <div>
                <h1>Add Subtasks</h1>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Map through our array to draw the form fields */}
                {subtasks.map((task, index) => (
                    <div key={task.id}>

                        {/* Task Header & Remove Button */}
                        <div>
                            <h2>Subtask #{index + 1}</h2>
                            {subtasks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubtask(task.id)}
                                >
                                    Verwijder
                                </button>
                            )}
                        </div>

                        {/* Name Input */}
                        <div>
                            <label>Naam</label>
                            <input
                                type="text"
                                placeholder="e.g. Write Introduction"
                                value={task.name}
                                onChange={(e) => handleChange(task.id, 'name', e.target.value)}
                                required
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label>Beschrijving</label>
                            <textarea
                                placeholder="Details over deze taak..."
                                value={task.description}
                                onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                            />
                        </div>

                        {/* Deadline Input */}
                        <div>
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={task.deadline}
                                onChange={(e) => handleChange(task.id, 'deadline', e.target.value)}
                            />
                        </div>

                    </div>
                ))}

                {/* --- ACTION BUTTONS --- */}
                <div>
                    <button
                        type="button"
                        onClick={handleAddSubtask}
                    >
                        + Extra Subtaak
                    </button>

                    <button
                        type="submit"
                    >
                        Alles Opslaan
                    </button>
                </div>

            </form>
        </main>
    );
};

export default CreateSubtasks;