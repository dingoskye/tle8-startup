// front-end/src/pages/createTask.jsx
import React, {useState} from "react";
import {useNavigate} from "react-router";

export function CreateTask({onSubmit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [deadline, setDeadline] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Titel is verplicht.";
        if (!description.trim()) newErrors.description = "Beschrijving is verplicht.";
        if (!file) {
            newErrors.file = "Bestand is verplicht.";
        } else if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
            newErrors.file = "Alleen afbeeldingen (PNG/JPEG) of PDF's zijn toegestaan.";
        }
        if (!deadline) {
            newErrors.deadline = "Deadline is verplicht.";
        } else if (deadline && isNaN(Date.parse(deadline))) {
            newErrors.deadline = "Ongeldige datum.";
        }
        return newErrors;
    };

    const handleImmediateSubmit = (e) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit?.({title, description, file, deadline});
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

    return (
        <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: "var(--background)"}}>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center" style={{color: "var(--font-blue)"}}>Hoofdtaak
                    Maken</h1>
                <form className="flex flex-col gap-6" onSubmit={handleImmediateSubmit} noValidate>
                    <div
                        className="flex flex-col p-4 rounded-lg"
                        role="group"
                        aria-labelledby="label-titel"
                        style={{backgroundColor: "var(--flamingo-pink)", color: "var(--font-blue)"}}
                    >
                        <label id="label-titel" htmlFor="titel" className="font-semibold mb-2">Titel:</label>
                        <input
                            type="text"
                            id="titel"
                            name="titel"
                            placeholder="Voer de taak titel in."
                            title="Taak titel"
                            aria-labelledby="label-titel"
                            aria-describedby={errors.title ? "titel-error" : undefined}
                            aria-required="true"
                            aria-invalid={!!errors.title}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                            style={{backgroundColor: "var(--thoas-white)", color: "var(--font-blue)"}}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setErrors(prev => ({...prev, title: undefined}));
                            }}
                        />
                        {errors.title &&
                            <span id="titel-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center" style={{
                                backgroundColor: "var(--ruas-red)",
                                color: "var(--font-blue)"
                            }}>{errors.title}</span>}
                    </div>

                    <div
                        className="flex flex-col p-4 rounded-lg"
                        role="group"
                        aria-labelledby="label-beschrijving"
                        style={{backgroundColor: "var(--skye-blue)", color: "var(--font-blue)"}}
                    >
                        <label id="label-beschrijving" htmlFor="beschrijving"
                               className="font-semibold mb-2">Beschrijving:</label>
                        <textarea
                            id="beschrijving"
                            name="beschrijving"
                            rows="5"
                            title="Taak beschrijving"
                            placeholder="Beschrijf de taak in detail."
                            aria-labelledby="label-beschrijving"
                            aria-describedby={errors.description ? "beschrijving-error" : undefined}
                            aria-required="true"
                            aria-invalid={!!errors.description}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none"
                            style={{backgroundColor: "var(--thoas-white)", color: "var(--font-blue)"}}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrors(prev => ({...prev, description: undefined}));
                            }}
                        />
                        {errors.description &&
                            <span id="beschrijving-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center"
                                  style={{
                                      backgroundColor: "var(--ruas-red)",
                                      color: "var(--font-blue)"
                                  }}>{errors.description}</span>}
                    </div>

                    <div
                        className="flex flex-col p-4 rounded-lg"
                        role="group"
                        aria-labelledby="label-upload"
                        style={{backgroundColor: "var(--jade-green)", color: "var(--font-blue)"}}
                    >
                        <label id="label-upload" htmlFor="upload" className="font-semibold mb-2">
                            Upload file (Afbeelding of PDF)
                        </label>

                        {/* Verborgen voor screenreaders. */}
                        <span
                            id="upload-help"
                            style={{
                                position: "absolute",
                                left: "-10000px",
                                top: "auto",
                                width: "1px",
                                height: "1px",
                                overflow: "hidden"
                            }}
                        >
                            Toegestane bestandstypen: PNG, JPEG of PDF.
                        </span>

                        <input
                            type="file"
                            id="upload"
                            name="upload"
                            accept="image/png,image/jpeg,application/pdf"
                            title="Upload afbeelding of PDF"
                            aria-labelledby="label-upload"
                            aria-describedby={errors.file ? "upload-help upload-error" : "upload-help"}
                            aria-required="true"
                            aria-invalid={!!errors.file}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                            style={{backgroundColor: "var(--thoas-white)", color: "var(--font-blue)"}}
                            onChange={(e) => {
                                const f = e.target.files?.[0] || null;
                                setFile(f);
                                setErrors(prev => ({...prev, file: undefined}));
                            }}
                        />
                        {errors.file &&
                            <span id="upload-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center" style={{
                                backgroundColor: "var(--ruas-red)",
                                color: "var(--font-blue)"
                            }}>{errors.file}</span>}
                    </div>

                    <div
                        className="flex flex-col p-4 rounded-lg"
                        role="group"
                        aria-labelledby="label-deadline"
                        style={{backgroundColor: "var(--christa-yellow)", color: "var(--font-blue)"}}
                    >
                        <label id="label-deadline" htmlFor="deadline" className="font-semibold mb-2">Deadline:</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            title="Kies een deadline"
                            aria-labelledby="label-deadline"
                            aria-describedby={errors.deadline ? "deadline-error" : undefined}
                            aria-required="true"
                            aria-invalid={!!errors.deadline}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                            style={{backgroundColor: "var(--thoas-white)", color: "var(--font-blue)"}}
                            value={deadline}
                            onChange={(e) => {
                                setDeadline(e.target.value);
                                setErrors(prev => ({...prev, deadline: undefined}));
                            }}
                        />
                        {errors.deadline &&
                            <span id="deadline-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center"
                                  style={{
                                      backgroundColor: "var(--ruas-red)",
                                      color: "var(--font-blue)"
                                  }}>{errors.deadline}</span>}
                    </div>

                    <button type="submit"
                            className="mt-4 px-12 py-2 font-semibold rounded-md self-center hover:opacity-90 transition-opacity"
                            style={{backgroundColor: "var(--ruas-red)", color: "var(--font-blue)"}}>Start
                    </button>
                </form>
            </div>
        </div>
    );
}
