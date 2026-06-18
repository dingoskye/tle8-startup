import {useEffect, useState} from "react";
import {useApi} from "@/context/api-context.jsx";
import {Card} from "@/components/ui/cards.jsx";
import {TapeCard} from "@/components/ui/cards.jsx";
import {useNavigate, useParams} from "react-router";

// Nieuwe taak aanmaken.

export function CreateTask() {
    const {apiFetch, token} = useApi();
    const initialForm = {
        title: "",
        description: "",
        deadline: "",
        ai_file: null
    };

    const [form, setForm] = useState(initialForm);
    const params = useParams()

    const setField = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate()

    //Form validatie.
    const validateForm = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Titel is verplicht.";
        if (!form.ai_file) newErrors.file = "Bestand is verplicht.";
        else if (!["application/txt", "application/pdf"].includes(form.ai_file.type)) {
            newErrors.file = "Alleen PDF's of TXT bestanden zijn toegestaan.";
        }
        if (!form.deadline) newErrors.deadline = "Deadline is verplicht.";
        return newErrors;
    };

    // Formulier indienen.

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

        for (const [key, value] of Object.entries(form)) {
            console.log(key, value);
            if (value !== null) {
                let sendValue = value;

                if (key === "deadline" && typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    sendValue = `${value}T00:00:00`;
                }

                formData.append(key, sendValue);
            }
        }
        formData.append("group_id", params.id);

        try {
            await apiFetch(`/main/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            setForm(initialForm);
            navigate("/")
        } catch (err) {
            console.error("Failed to create task:", err);
            setErrors({general: "Er is een fout opgetreden bij het aanmaken van de taak."});
        } finally {
            setSubmitting(false);
        }
    };

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Hoofdtaak aanmaken";
    }, [])

    return (
        <Card variant="white">
            <h1 className="text-3xl font-headers text-center mt-2">Hoofdtaak maken</h1>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <TapeCard variant="quaternary">
                    <div role="group" aria-labelledby="label-titel" className="flex flex-col">
                        <label id="label-titel" htmlFor="titel"
                               className="font-headers text-left text-lg mb-2">Titel:</label>
                        <input
                            type="text"
                            id="titel"
                            name="titel"
                            placeholder="Voer de taak titel in."
                            title="Taak titel"
                            aria-labelledby="label-titel"
                            aria-describedby={errors.title ? "titel-error" : undefined}
                            aria-invalid={!!errors.title}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-bg-white"
                            value={form.title}
                            onChange={(e) => {
                                setField("title", e.target.value);
                                setErrors(prev => ({...prev, title: undefined}));
                            }}
                        />
                        {errors.title && <span id="titel-error" role="alert" aria-live="assertive"
                                               className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">{errors.title}</span>}
                    </div>
                </TapeCard>

                <TapeCard variant="primary">
                    <div role="group" aria-labelledby="label-beschrijving" className="flex flex-col">
                        <label id="label-beschrijving" htmlFor="beschrijving"
                               className="font-headers text-left text-lg mb-2">Beschrijving:</label>
                        <textarea
                            id="beschrijving"
                            name="beschrijving"
                            rows="5"
                            title="Taak beschrijving"
                            placeholder="Beschrijf de taak in detail."
                            aria-labelledby="label-beschrijving"
                            aria-describedby={errors.description ? "beschrijving-error" : undefined}
                            aria-invalid={!!errors.description}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none bg-bg-white"
                            value={form.description}
                            onChange={(e) => {
                                setField("description", e.target.value);
                                setErrors(prev => ({...prev, description: undefined}));
                            }}
                        />
                    </div>
                </TapeCard>

                <TapeCard variant="secondary">
                    <div role="group" aria-labelledby="label-upload" aria-describedby="upload-help"
                         className="flex flex-col">
                        <label id="label-upload" htmlFor="upload" className="font-headers text-left text-lg mb-2">Rubric
                            File (PDF of TXT): </label>
                        <input
                            type="file"
                            id="upload"
                            name="upload"
                            accept="image/png,image/jpeg,application/pdf"
                            title="Upload afbeelding of PDF"
                            aria-labelledby="label-upload"
                            aria-describedby={errors.file ? "upload-help upload-error" : "upload-help"}
                            aria-invalid={!!errors.file}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-bg-white"
                            onChange={(e) => {
                                setField("ai_file", e.target?.files[0]);
                                setErrors(prev => ({...prev, file: undefined}));
                            }}
                        />
                        {errors.file && <span id="upload-error" role="alert" aria-live="assertive"
                                              className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">{errors.file}</span>}
                    </div>
                </TapeCard>

                <TapeCard variant="tertiary">
                    <div role="group" aria-labelledby="label-deadline" className="flex flex-col">
                        <label id="label-deadline" htmlFor="deadline"
                               className="font-headers text-left text-lg mb-2">Deadline:</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            title="Kies een deadline"
                            aria-labelledby="label-deadline"
                            aria-describedby={errors.deadline ? "deadline-error" : undefined}
                            aria-invalid={!!errors.deadline}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-bg-white"
                            value={form.deadline}
                            onChange={(e) => {
                                setField("deadline", e.target.value);
                                setErrors(prev => ({...prev, deadline: undefined}));
                            }}
                        />
                        {errors.deadline && <span id="deadline-error" role="alert" aria-live="assertive"
                                                  className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">{errors.deadline}</span>}
                    </div>
                </TapeCard>

                {errors.general && <div role="alert"
                                        className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">{errors.general}</div>}

                <button type="submit" disabled={submitting}
                        className="w-[60%] md:w-[30%] py-2 px-4 font-headers rounded-full self-center text-xl hover:opacity-90 transition-opacity bg-button-purple border-6 border-white shadow-md">
                    {submitting ? "Versturen..." : "Maak aan"}
                </button>
            </form>
        </Card>
    );
}

export default CreateTask;