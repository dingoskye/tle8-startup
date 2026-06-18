import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {Card} from "@/components/ui/cards.jsx";
import {TapeCard} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import {useApi} from "@/context/api-context.jsx";
import {MainButton, SubmitButton} from "@/components/ui/buttons.jsx";

function Subtask() {
    const {apiFetch, token} = useApi();


    const params = useParams();
    // console.log("PARAMS:", params);

    const id = params.id;
    // console.log("ID:", id);

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        context: '',
        niveau: 1,
    });
    const [details, setDetails] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!id) return;
        fetchTaskDetails(id);
    }, [id]);

    async function fetchTaskDetails(id) {
        try {
            const data = await apiFetch(`/main/details/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!data || data.message || !data.title) {
                setErrors({fetchError: "Error: De opgevraagde hoofdtaak bestaat niet (meer) in de database."});
                return;
            }

            setDetails(data);
            console.log(data);
        } catch (e) {
            console.log(e.message);
            setErrors({fetchError: "Error: De opgevraagde hoofdtaak bestaat niet (meer) in de database."});
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    useEffect(() => {
        console.log("FORMDATA:", formData);
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.context.trim()) {
            newErrors.context = "Context is verplicht.";
        }

        if (!formData.niveau) {
            newErrors.niveau = "Niveau is verplicht.";
        } else if (Number(formData.niveau) < 1 || Number(formData.niveau) > 4) {
            newErrors.niveau = "Niveau moet tussen 1 en 4 zijn.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Deze console log is een restant van testen, die voor toekomstige problemen ook gebruikt kan worden
        // console.log(formData);

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setSubmitting(true)

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/main-tasks/${id}/generate-subtasks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            console.log("Backend response:", data);

            if (!res.ok) {
                throw new Error(data.message || "Subtasks genereren mislukt");
            }

            console.log("Gegenereerde subtaken:", data);

            navigate(`/hoofdtaken/${id}`);
        } catch (err) {
            console.error(err);
            setErrors({general: "Er is een fout opgetreden bij het genereren van de subtaken."});
        }
    };

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Subtaken genereren";
    }, [])

    return (
        <Card variant={"white"}>
            {errors.fetchError ? (
                <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                    <h1 className="text-3xl font-headers text-red-600">Oeps!</h1>
                    <p className="text-lg font-paragraph font-bold">
                        {errors.fetchError}
                    </p>
                    <div className="w-[75%] md:w-[30%] mx-auto">
                        <MainButton link={"/hoofdtaken"}>
                            Terug naar overzicht
                        </MainButton>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-headers flex items-center justify-center mt-3">
                        {details?.title}
                    </h1>

                    <section>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                            <TapeCard variant="quaternary">
                                <label htmlFor="context" className="block font-headers text-lg text-left mb-4">
                                    Context:
                                </label>

                                <textarea
                                    id="context"
                                    name="context"
                                    value={formData.context}
                                    onChange={handleInputChange}
                                    className="w-full min-h-30 bg-white/80 p-3 outline-none resize-none"
                                    placeholder="Geef context mee aan de AI."
                                />

                                {errors.context && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.context}
                                    </p>
                                )}
                            </TapeCard>

                            <TapeCard variant="tertiary">

                                <label htmlFor="niveau" className="block font-headers mb-4 text-lg text-left">
                                    Niveau:
                                </label>

                                <div className="relative">
                                    {/* lijn */}
                                    <div className="absolute left-0 right-0 top-6 h-0.5 bg-black"></div>

                                    {/* slider */}
                                    <div className="grid grid-cols-4">
                                        {[1, 2, 3, 4].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                aria-label={`Niveau ${value}`}
                                                aria-pressed={Number(formData.niveau) === value}
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        niveau: value,
                                                    }))
                                                }
                                                className="relative flex h-12 justify-center">
                                                {/* verticale lijn */}
                                                <span className="absolute top-0 h-12 w-0.5 bg-black"></span>

                                                {/* slider dot */}
                                                {Number(formData.niveau) === value && (
                                                    <span
                                                        className="absolute top-4 z-30 h-5 w-5 rounded-full bg-red-600 [box-shadow:2px_2px_6px_rgba(0,0,0,0.7)] before:absolute before:top-1/2 before:left-1/2 before:block before:size-3.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-red-600 before:[box-shadow:inset_2px_2px_4px_rgba(255,255,255,0.25),2px_2px_6px_rgba(80,80,80,0.5)] before:content-['']"/>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-4 mt-3 text-[15px] font-paragraph">
                                        <span className="text-center">Beginner</span>
                                        <span className="text-center">In ontwikkeling</span>
                                        <span className="text-center">Gevorderd</span>
                                        <span className="text-center">Expert</span>
                                    </div>

                                    {errors.niveau && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.niveau}
                                        </p>
                                    )}
                                </div>
                            </TapeCard>

                            {errors.general &&
                                <p role="alert"
                                   className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">{errors.general}</p>}

                            <div className="w-[60%] md:w-[30%] mx-auto mb-5">
                                <SubmitButton>
                                    {submitting ? "AI is aan het werk..." : "Genereren"}
                                </SubmitButton>
                            </div>
                        </form>
                    </section>
                </>
            )}
        </Card>
    );
}

export default Subtask