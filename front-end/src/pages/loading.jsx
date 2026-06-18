import {Card} from "@/components/ui/cards.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

function Loading() {
    const [loading, setLoading] = useState(0);
    const navigate = useNavigate();

    const loadText = [
        "Bestand inlezen...",
        "Taken aanmaken...",
        "Deadlines aanmaken...",
        "Laatste stuk..."
    ];
    const loadTimeInterval = 100 / loadText.length;
    const textIndex = Math.min(loadText.length - 1, Math.floor(loading / loadTimeInterval));
    const currentLoadText = loadText[textIndex];

    // Scherm scrollen uitschakelen tijdens het laden om de navigatie onder aan de pagina te verbergen.
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setLoading((progress) => Math.min(100, progress + Math.floor(Math.random() * 10) + 5));
        }, 200);
        return () => clearInterval(id);
    }, []);

    // Stuur door naar hoofdtaken pagina. Vervang route als nodig is.
    // Timeout om de balk tijd te geven om te vullen. ClearTimeout om te voorkomen dat er meerdere timeouts gemaakt worden.
    useEffect(() => {
        if (loading >= 100) {
            const timeout = setTimeout(() => {
                navigate("/hoofdtaken");
            }, 250);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    return (
        // div om de card in het midden van het scherm te zetten.
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-xs">
                <Card variant="tertiary">
                    <h1 className="text-2xl font-headers text-center mb-4">Laden...</h1>

                    <p className="mb-2 text-sm text-center">{Math.floor(loading)}%</p>

                    <div
                        className="w-full h-3 rounded border border-black/20 bg-white overflow-hidden"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={Math.floor(loading)}
                    >
                        <div
                            className="h-full bg-black shadow-inner transition-[width] duration-200"
                            style={{width: `${loading}%`}}
                        />
                    </div>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        {currentLoadText}
                    </p>
                </Card>
            </div>
        </div>
    );
}


export default Loading
