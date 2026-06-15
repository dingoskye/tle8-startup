import {Card} from "@/components/ui/cards.jsx";
import {useEffect, useState} from "react";

function Loading({onComplete} = {}) {
    const [loading, setLoading] = useState(true)
    const loadText = [
        "Bestand inlezen...",
        "Taken aanmaken...",
        "Deadlines aanmaken...",
        "Final touches..."
    ]

    useEffect(() => {
        const id = setInterval(() => {
            setLoading((p) => {
                const next = Math.min(100, p + Math.floor(Math.random() * 10) + 5);
                return next;
            });
        }, 200);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (loading >= 100) {
            const t = setTimeout(() => onComplete && onComplete(), 250);
            return () => clearTimeout(t);
        }
    }, [loading, onComplete]);

    const loadTimeInterval = 100 / loadText.length;
    const textIndex = Math.min(loadText.length - 1, Math.floor(loading / loadTimeInterval));
    const currentLoadText = loadText[textIndex];

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <article className="w-full max-w-xs">
                <Card variant="tertiary" className="w-full p-6 mx-auto">
                    <h1 className="text-2xl font-headers text-center mb-4">Loading...</h1>

                    <div className="mb-2 text-sm text-center">{Math.floor(loading)}%</div>

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

                    <div className="mt-4 text-center text-xs text-muted-foreground">
                        {currentLoadText}
                    </div>
                </Card>
            </article>
        </div>
    );
}


export default Loading