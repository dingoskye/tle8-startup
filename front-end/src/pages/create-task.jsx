import {useState} from "react";
import {useMainTask} from "@/context/task-context.jsx";
import {useApi} from "@/context/api-context.jsx";
import Tape from '../components/ui/tape';
import Punaise from '../components/ui/punaise';

export function CreateTask() {
    const {fetchMainTasks} = useMainTask();
    const {apiFetch} = useApi();
    const initialForm = {
        title: "",
        description: "",
        file: null,
        deadline: "",
    };

    const [form, setForm] = useState(initialForm);

    const setField = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Form valideren.
    const validateForm = () => {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Titel is verplicht.";
        }

        if (!form.description.trim()) {
            newErrors.description = "Beschrijving is verplicht.";
        }

        if (!form.file) {
            newErrors.file = "Bestand is verplicht.";
        } else if (
            !["image/png", "image/jpeg", "application/pdf"].includes(form.file.type)
        ) {
            newErrors.file =
                "Alleen afbeeldingen (PNG/JPEG) of PDF's zijn toegestaan.";
        }

        if (!form.deadline) {
            newErrors.deadline = "Deadline is verplicht.";
        }

        return newErrors;
    };

    // Form submit function.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return;

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setSubmitting(true);

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("deadline", form.deadline);
        formData.append("group_id", "1");
        formData.append("ai_file", form.file);

        try {
            await apiFetch("/api/main/create", {
                method: "POST",
                body: formData,
            });

            await fetchMainTasks?.();

            setForm(initialForm);

        } catch (err) {
            console.error("Failed to create task:", err);

            setErrors({
                general: "Er is een fout opgetreden bij het aanmaken van de taak.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <Punaise/>
                <h1 className="text-3xl font-bold mb-8 text-center text-[var(--font-blue)]">Hoofdtaak Maken</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
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
                            value={form.title}
                            onChange={(e) => {
                                setField("title", e.target.value);
                                setErrors(prev => ({
                                    ...prev,
                                    title: undefined,
                                }));
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
                            value={form.description}
                            onChange={(e) => {
                                setField("description", e.target.value);
                                setErrors(prev => ({
                                    ...prev,
                                    description: undefined,
                                }));
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
                            Upload het document of afbeelding waarop de taak gebaseerd is.
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
                                setField("file", e.target.files?.[0] || null);

                                setErrors(prev => ({
                                    ...prev,
                                    file: undefined,
                                }));
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
                            value={form.deadline}
                            onChange={(e) => {
                                setField("deadline", e.target.value);
                                setErrors(prev => ({
                                    ...prev,
                                    deadline: undefined,
                                }));
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
