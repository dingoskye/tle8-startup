import React, {useEffect, useState} from "react";

export function SubmitTest() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const raw = sessionStorage.getItem("lastSubmittedTask");
        if (raw) {
            try {
                const task = JSON.parse(raw);
                const newResult = {
                    id: Date.now(),
                    title: task.title,
                    description: task.description,
                    fileName: task.fileName,
                    deadline: task.deadline,
                };
                setResults(prev => [newResult, ...prev]);
                console.log("Loaded task from sessionStorage:", newResult);
                sessionStorage.removeItem("lastSubmittedTask");
            } catch (e) {
                console.error("Failed to parse lastSubmittedTask:", e);
            }
        }
    }, []);

    useEffect(() => {
        console.log("Results updated:", results);
    }, [results]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Ingediende Taken</h1>
            {results.length === 0 ? (
                <p className="text-center text-gray-500">Geen taken ingediend.</p>
            ) : (
                <div className="space-y-4">
                    {results.map(result => (
                        <div key={result.id} className="p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{result.title}</h2>
                            <p className="mt-2">{result.description}</p>
                            {result.fileName && (
                                <p className="mt-2 text-sm text-gray-600">Bestand: {result.fileName}</p>
                            )}
                            {result.deadline && (
                                <p className="mt-2 text-sm text-gray-600">Deadline: {result.deadline}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
