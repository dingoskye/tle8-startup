import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {MainButton, SubmitButton} from "../components/ui/buttons.jsx";
import {Card, TapeCard} from "../components/ui/cards.jsx";
import {useApi} from "../context/api-context.jsx";

function CreateMoment() {

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Moment aanmaken";
    }, [])

    const {apiFetch, token} = useApi();

    const { id } = useParams();
    const navigate = useNavigate();

    // State voor de nieuwe velden: datum, locatie en beschrijving
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = "Datum en tijd zijn verplicht.";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Locatie is verplicht.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Beschrijving is verplicht.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {

            const res = await fetch(`http://127.0.0.1:8000/api/moment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    group_id: id
                }),
            });

            const data = await res.json();

            console.log("Backend response:", data);

            if (!res.ok) {
                throw new Error(data.message || "Moment aanmaken mislukt");
            }

            console.log("Moment succesvol aangemaakt:", data);

            // Moet nog aangepast worden, zodra deze bestaat
            navigate(`/studiegroepen/${id}`);

        } catch (err) {
            console.error("Fout bij aanmaken moment:", err.message);
            setErrors({ general: "Er is een fout opgetreden bij het aanmaken van het moment." });
        }
    };

    return (
        <Card variant={"white"}>
            <h1 className="text-3xl font-headers flex items-center justify-center mb-10">
                Nieuw Moment Inplannen
            </h1>

            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                    <TapeCard variant="primary">
                        <label htmlFor="date" className="block font-headers mb-4">
                            Datum & Tijd:
                        </label>

                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full bg-white/80 p-3 outline-none"
                        />

                        {errors.date && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.date}
                            </p>
                        )}
                    </TapeCard>

                    <TapeCard variant="secondary">
                        <label htmlFor="location" className="block font-headers mb-4">
                            Locatie:
                        </label>

                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Bijv. Lokaal WN04.017 of Discord"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full bg-white/80 p-3 outline-none"
                        />

                        {errors.location && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.location}
                            </p>
                        )}
                    </TapeCard>

                    <TapeCard variant="quaternary">
                        <label htmlFor="description" className="block font-headers mb-4">
                            Beschrijving:
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Wat gaan we doen tijdens dit moment?"
                            className="w-full min-h-30 bg-white/80 p-3 outline-none resize-none"
                        />

                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </TapeCard>

                    {errors.general && (
                        <div role="alert" className="mt-1 rounded-lg flex justify-center text-(--ruas-red) font-semibold text-lg">
                            {errors.general}
                        </div>
                    )}

                    <div className="w-[45%] md:w-[15%] mx-auto flex flex-col items-center text-center mb-5">
                        <SubmitButton>
                            Aanmaken
                        </SubmitButton>
                    </div>
                </form>
            </section>
        </Card>
    );
}

export default CreateMoment