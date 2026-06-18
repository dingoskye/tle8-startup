import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../components/ui/cards.jsx";
import { useApi } from "../context/api-context.jsx";

function MomentDetails() {
    const { token } = useApi();

    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [errors, setErrors] = useState({});

    // Nieuwe state om een lader te tonen tijdens de fetch
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchTaskDetails() {
            try {
                setLoading(true);
                const res = await fetch(`http://127.0.0.1:8000/api/moment/details/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                // FIX: Aangepast van !data.title naar res.ok, omdat een moment (waarschijnlijk) geen titel heeft
                if (!res.ok || !data || data.message) {
                    setErrors({ fetchError: "Error: Het opgevraagde moment bestaat niet (meer) in de database." });
                    return;
                }

                setDetails(data);
                console.log("Opgehaalde data:", data);

            } catch (e) {
                console.error("Fetch error:", e.message);
                setErrors({ fetchError: "Error: Kan geen verbinding maken met de server." });
            } finally {
                setLoading(false);
            }
        }

        fetchTaskDetails();
    }, [id, token]);

    useEffect(() => {
        if (details && details.date) {
            const dateStr = new Date(details.date).toLocaleDateString('nl-NL');
            document.title = `Board-it | Moment op ${dateStr}`;
        } else {
            document.title = "Board-it | Moment Details";
        }
    }, [details]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card variant="white">
            <h1 className="text-3xl font-headers flex items-center justify-center mb-8">
                Moment Details
            </h1>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-lg font-headers animate-pulse text-gray-500">Gegevens laden...</p>
                </div>
            )}

            {errors.fetchError && !loading && (
                <div className="text-center text-red-600 py-10">
                    <p className="font-bold mb-4">{errors.fetchError}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="underline font-headers text-sm">
                        Ga terug
                    </button>
                </div>
            )}

            {details && !loading && !errors.fetchError && (
                <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-6">

                        <div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block mb-1">
                                Datum & Tijd
                            </span>
                            <span className="text-xl font-headers">
                                {formatDate(details.date)}
                            </span>
                        </div>

                        <div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block mb-1">
                                Locatie
                            </span>
                            <span className="text-lg">
                                {details.location}
                            </span>
                        </div>

                        <div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block mb-1">
                                Beschrijving
                            </span>
                            <p className="text-gray-800 whitespace-pre-wrap">
                                {details.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-black text-white font-headers px-8 py-3 rounded hover:bg-black/80 transition-all shadow-md">
                            Terug naar overzicht
                        </button>
                    </div>

                </div>
            )}
        </Card>
    );
}

export default MomentDetails;