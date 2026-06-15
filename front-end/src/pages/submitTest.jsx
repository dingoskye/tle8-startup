//PLACEHOLDER VOOR TESTEN, NIET GEBRUIKEN IN DE VOLLEDIGE RELEASE.
import {useEffect, useState} from "react";

export function SubmitTest() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    const LIST_ENDPOINT = `${API_BASE}/api/main/id`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadFromSession = () => {
            const raw = sessionStorage.getItem("lastSubmittedTask");
            if (!raw) return false;
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
                sessionStorage.removeItem("lastSubmittedTask");
                return true;
            } catch (e) {
                console.error("Failed to parse lastSubmittedTask:", e);
                return false;
            }
        };

        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(LIST_ENDPOINT, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {Accept: "application/json"},
                    signal,
                });
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`API error ${res.status}: ${text}`);
                }
                const payload = await res.json().catch(() => []);
                const items = Array.isArray(payload) ? payload : (payload.tasks || []);
                const mapped = items.map(item => ({
                    id: item.id ?? item.task_id ?? Date.now(),
                    title: item.title ?? item.name ?? "Untitled",
                    description: item.description ?? item.desc ?? "",
                    fileName: item.file_name ?? item.fileName ?? null,
                    deadline: item.deadline ?? null,
                }));
                if (mapped.length === 0) {
                    loadFromSession();
                } else {
                    setResults(mapped);
                }
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Failed to load tasks:", err);
                setError("Failed to load tasks from server.");
                // try session fallback
                loadFromSession();
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();

        return () => controller.abort();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Ingediende Taken</h1>

            {loading && <p className="text-center text-gray-500">Laden...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}

            {!loading && results.length === 0 && !error && (
                <p className="text-center text-gray-500">Geen taken ingediend.</p>
            )}

            {!loading && results.length > 0 && (
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
