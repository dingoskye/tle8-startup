import React, {useState} from "react";
import {useNavigate} from "react-router";

// Taak functie voor het formulier.
export function CreateTask({onSubmit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();


    // Submit handler om direct data te verwerken.
    const handleImmediateSubmit = (e) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        if (!title.trim()) return;
        onSubmit?.({title, description, file, deadline});
        // SessionStorage om data door te geven.
        try {
            sessionStorage.setItem(
                "lastSubmittedTask",
                JSON.stringify({
                    title,
                    description,
                    fileName: file?.name || null,
                    deadline,
                })
            );
        } catch (err) {
        }
        navigate("/submit-test");
    };

    // HTML render.
    return (
        <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: "var(--background)"}}>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center">Hoofdtaak Maken</h1>
                <form className="flex flex-col gap-6" onSubmit={handleImmediateSubmit}>
                    <div className="flex flex-col p-4 rounded-lg" style={{backgroundColor: "var(--flamingo-pink)"}}>
                        <label htmlFor="titel" className="font-semibold mb-2">Titel:</label>
                        <input type="text" id="titel" name="titel"
                               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                               style={{backgroundColor: 'var(--thoas-white)'}}
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="flex flex-col p-4 rounded-lg" style={{backgroundColor: "var(--skye-blue)"}}>
                        <label htmlFor="beschrijving" className="font-semibold mb-2">Beschrijving:</label>
                        <textarea id="beschrijving" name="beschrijving" rows="5"
                                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none"
                                  style={{backgroundColor: 'var(--thoas-white)'}}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="flex flex-col p-4 rounded-lg" style={{backgroundColor: "var(--jade-green)"}}>
                        <label htmlFor="upload" className="font-semibold mb-2">File:</label>
                        <input type="file" id="upload" name="upload"
                               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                               style={{backgroundColor: 'var(--thoas-white)'}}
                               onChange={(e) => setFile(e.target.files?.[0] || null)}/>
                    </div>

                    <div className="flex flex-col p-4 rounded-lg" style={{backgroundColor: "var(--christa-yellow)"}}>
                        <label htmlFor="deadline" className="font-semibold mb-2">Deadline:</label>
                        <input type="date" id="deadline" name="deadline"
                               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                               style={{backgroundColor: 'var(--thoas-white)'}}
                               value={deadline}
                               onChange={(e) => setDeadline(e.target.value)}/>
                    </div>

                    <button type="submit"
                            className="mt-4 px-12 py-2 font-semibold rounded-md self-center hover:opacity-90 transition-opacity"
                            style={{backgroundColor: 'var(--ruas-red)'}}>Start
                    </button>
                </form>
            </div>
        </div>
    );
}
