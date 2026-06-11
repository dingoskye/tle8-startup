import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import {useApi} from "@/context/api-context.jsx";

function Subtask() {
    const {apiFetch} = useApi();


    const params = useParams();
    // console.log("PARAMS:", params);

    const id = params.id;
    // console.log("ID:", id);

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        context: '',
        niveau: 1,
        main_task_id: id,
    });
    const [details, setDetails] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!id) return;

        setFormData((prev) => ({
            ...prev,
            main_task_id: id,
        }));

        fetchTaskDetails(id);
    }, [id]);

    async function fetchTaskDetails(id) {
            // console.log("ID IN LOADDETAILS:", id);
        try {
            const data = await apiFetch(`/main/details/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            setDetails(data);
            console.log(data);
        } catch (e) {
            console.log(e.message);
            // navigate("/");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

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
        console.log(formData);

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        //
        // try {
        //     const res = await apiFetch(`/main-tasks/${id}/generate-subtasks`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json'
        //             },
        //              body: JSON.stringify({
        //                 ...formData,
        //                 main_task_id: id,
        //             }),
        //         });
        //
        //     if (!res.ok) {
        //         throw new Error("Create failed");
        //     }
        //
        //     const created = await res.json();
        //     navigate("/hoofdtaken/:id", { state: { created } });
        //
        //     } catch (e) {
        //         console.error(e);
        //     }
    };

    return (
      <Card variant={"white"}>

            <h1 className="text-4xl font-bold font-headers mb-10  flex items-center justify-center">
                {details?.title}
            </h1>

            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                    <div className="relative bg-(--flamingo-pink) p-4 shadow-md">
                        <Tape variant="big-r"/>
                        <Tape variant="big-l"/>

                        <label htmlFor="context" className="block font-bold mb-4 font-paragraph">
                            Context:
                        </label>

                        <textarea
                            id="context"
                            name="context"
                            value={formData.context}
                            onChange={handleInputChange}
                            className="w-full min-h-30 bg-white/80 p-3 outline-none resize-none"
                        />

                        {errors.context && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.context}
                            </p>
                        )}
                    </div>

                    <div className="relative bg-(--christa-yellow) p-4 shadow-md">

                        {/*<div className="absolute -top-2 -left-2 w-8 h-2 bg-amber-700/60 -rotate-45"></div>*/}
                        {/*<div className="absolute -top-2 -right-2 w-8 h-2 bg-amber-700/60 rotate-45"></div>*/}
                        <Tape variant="big-r"/>
                        <Tape variant="big-l"/>

                        <label htmlFor="niveau" className="block font-bold mb-4 font-paragraph">
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
                                            // <span className="absolute top-4 z-30 h-5 w-5 rounded-full border-2 border-red-800 bg-red-600 shadow-md"></span>
                                            <span className="absolute top-4 z-30 h-5 w-5 rounded-full bg-red-600 [box-shadow:2px_2px_6px_rgba(0,0,0,0.7)] before:absolute before:top-1/2 before:left-1/2 before:block before:size-3.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-red-600 before:[box-shadow:inset_2px_2px_4px_rgba(255,255,255,0.25),2px_2px_6px_rgba(80,80,80,0.5)] before:content-['']" />
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

                    </div>
                    <button type="submit" className="self-center mt-16 px-8 py-2 rounded-full bg-[#ddaefe] text-black border-2 border-white shadow-md font-bold hover:scale-105 transition">
                        Genereren
                    </button>
                </form>
            </section>
      </Card>
    );
}

export default Subtask