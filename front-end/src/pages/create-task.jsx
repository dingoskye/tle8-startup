import {useState} from "react";
import {useMainTask} from "@/context/task-context.jsx";
import {useApi} from "@/context/api-context.jsx";
import Tape from '../components/ui/tape';
import Punaise from '../components/ui/punaise';

export function CreateTask() {
    const {fetchMainTasks} = useMainTask();
    const {apiFetch} = useApi();
    const [form, setForm] = useState({
        title: "",
        description: "",
        file: null,
        deadline: "",
    });
    const {title, description, file, deadline} = form;

    const setField = (key, value) => setForm(prev => ({...prev, [key]: value}));
    const setTitle = v => setField("title", v);
    const setDescription = v => setField("description", v);
    const setFile = v => setField("file", v);
    const setDeadline = v => setField("deadline", v);

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Form valideren.
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

    // Form submit function.
    const handleImmediateSubmit = async (e) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        if (submitting) return;
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitting(true);

        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("deadline", deadline);
        fd.append("group_id", "1");
        if (file) fd.append("ai_file", file);

        try {
            await apiFetch("/api/main/create", {
                method: "POST",
                body: fd,
            });

            try {
                await fetchMainTasks?.();
            } catch (e) {
                console.warn("refresh main tasks failed:", e);
            }

            setForm({
                title: "",
                description: "",
                file: null,
                deadline: "",
            });

            setSubmitting(false);
        } catch (err) {
            console.error("submit error:", err);
            const payload = err?.payload || {};
            const backendErrors = (payload && payload.errors) ? payload.errors : {};
            if (payload && payload.message && Object.keys(backendErrors).length === 0) {
                backendErrors.general = payload.message;
            }

            setErrors(prev => ({
                ...prev, ...backendErrors,
                general: prev.general || "Er is een netwerkfout opgetreden."
            }));
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <Punaise/>
                <h1 className="text-3xl font-bold mb-8 text-center text-[var(--font-blue)]">Hoofdtaak Maken</h1>
                <form className="flex flex-col gap-6" onSubmit={handleImmediateSubmit} noValidate>
                    <div
                        className="relative flex flex-col p-4 rounded-lg bg-[var(--flamingo-pink)] text-[var(--font-blue)]"
                        role="group"
                        aria-labelledby="label-titel"
                    >
                        <Tape variant="small-r"/>
                        <Tape variant="small-l"/>
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
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[var(--thoas-white)] text-[var(--font-blue)]"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setErrors(prev => ({...prev, title: undefined}));
                            }}
                        />
                        {errors.title &&
                            <span id="titel-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center bg-[var(--ruas-red)] text-[var(--font-blue)]">{errors.title}</span>}
                    </div>

                    <div
                        className="relative flex flex-col p-4 rounded-lg bg-[var(--skye-blue)] text-[var(--font-blue)]"
                        role="group"
                        aria-labelledby="label-beschrijving"
                    >
                        <Tape variant="small-r"/>
                        <Tape variant="small-l"/>
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
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none bg-[var(--thoas-white)] text-[var(--font-blue)]"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrors(prev => ({...prev, description: undefined}));
                            }}
                        />
                        {errors.description &&
                            <span id="beschrijving-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center bg-[var(--ruas-red)] text-[var(--font-blue)]">{errors.description}</span>}
                    </div>

                    <div
                        className="relative flex flex-col p-4 rounded-lg bg-[var(--jade-green)] text-[var(--font-blue)]"
                        role="group"
                        aria-labelledby="label-upload"
                        aria-describedby="upload-help"
                    >
                        <Tape variant="big-r"/>
                        <Tape variant="big-l"/>
                        <label id="label-upload" htmlFor="upload" className="font-semibold mb-2">
                            Upload file (Afbeelding of PDF)
                        </label>

                        <span id="upload-help" className="sr-only">
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
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[var(--thoas-white)] text-[var(--font-blue)]"
                            onChange={(e) => {
                                const f = e.target.files?.[0] || null;
                                setFile(f);
                                setErrors(prev => ({...prev, file: undefined}));
                            }}
                        />
                        {errors.file &&
                            <span id="upload-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center bg-[var(--ruas-red)] text-[var(--font-blue)]">{errors.file}</span>}
                    </div>

                    <div
                        className="relative flex flex-col p-4 rounded-lg bg-[var(--christa-yellow)] text-[var(--font-blue)]"
                        role="group"
                        aria-labelledby="label-deadline"
                    >
                        <Tape variant="small-r"/>
                        <Tape variant="small-l"/>
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
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[var(--thoas-white)] text-[var(--font-blue)]"
                            value={deadline}
                            onChange={(e) => {
                                setDeadline(e.target.value);
                                setErrors(prev => ({...prev, deadline: undefined}));
                            }}
                        />
                        {errors.deadline &&
                            <span id="deadline-error" role="alert" aria-live="assertive"
                                  className="text-sm mt-1 border-2 rounded-lg flex justify-center bg-[var(--ruas-red)] text-[var(--font-blue)]">{errors.deadline}</span>}
                    </div>

                    {errors.general &&
                        <div role="alert"
                             className="text-sm mt-1 border-2 rounded-lg flex justify-center bg-[var(--ruas-red)] text-[var(--font-blue)]">{errors.general}</div>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className=" mt-4 px-12 py-2 font-semibold rounded-full self-center hover:opacity-90 transition-opacity bg-[var(--ruas-red)] text-white border-2 border-white shadow-md "
                    >
                        {submitting ? "Versturen..." : "Start"}
                    </button>
                </form>
            </div>
        </div>
    );
}
