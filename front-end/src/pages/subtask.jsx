import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Subtask() {

    // const params = useParams()
    // const id = params.id;
    // const navigate = useNavigate();
    //
    // const [details, setDetails] = useState(null);
    // const [loading, setLoading] = useState(true);
    //
    // const loadDetails = async () => {
    //     try {
    //         setLoading(true);
    //
    //         const result = await fetch(`http://145.24.237.33:8000/circuits/${id}`, {
    //             method: "GET",
    //             headers: {
    //                 'Accept': 'application/json'
    //             },
    //         });
    //
    //         if (result.status === 404) {
    //             navigate("/");
    //             return;
    //         }
    //
    //         if (!result.ok) {
    //             throw new Error(`HTTP error! status: ${result.status}`);
    //         }
    //
    //         const data = await result.json();
    //
    //         console.log("DATA:", data);
    //
    //         setDetails(data);
    //         console.log(data);
    //     } catch (e) {
    //         console.log(e);
    //         navigate("/");
    //     } finally {
    //         setLoading(false);
    //     }
    //     console.log("FETCH URL:", `http://145.24.237.33:8000/circuits/${id}`);
    // };
    //
    // useEffect(() => {
    //     loadDetails();
    // }, [id]);
    //
    const [formData, setFormData] = useState({
        context: '',
        niveau: 1,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // try {
        //     const res = await fetch(
        //         'http://145.24.237.33:8000/circuits',
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json'
        //             },
        //             body: JSON.stringify(formData)
        //         }
        //     );
        //
        //     if (!res.ok) {
        //         throw new Error("Create failed");
        //     }
        //
        //     const created = await res.json();
        //     // navigate("/", { state: { created } });
        //
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <div className="relative max-w-md mx-auto min-h-175 bg-[#F0EFF2] p-8 rounded shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-md"></div>

            <h1 className="text-4xl font-bold text-black mb-10 font-serif">
                Ontwerpen 4
            </h1>

            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                    <div className="relative bg-(--flamingo-pink) p-4 shadow-md">
                        <div className="absolute -top-2 -left-2 w-8 h-2 bg-amber-700/60 -rotate-45"></div>
                        <div className="absolute -top-2 -right-2 w-8 h-2 bg-amber-700/60 rotate-45"></div>

                        <label htmlFor="context" className="block font-bold mb-2">
                            Context:
                        </label>

                        <textarea
                            id="context"
                            name="context"
                            value={formData.context}
                            onChange={handleInputChange}
                            className="w-full min-h-30 bg-white/80 p-3 outline-none resize-none"
                        />
                    </div>

                    {/*<div className="relative bg-(--christa-yellow) p-4 shadow-md">*/}
                    {/*    <div className="absolute -top-2 -left-2 w-8 h-2 bg-amber-700/60 -rotate-45"></div>*/}
                    {/*    <div className="absolute -top-2 -right-2 w-8 h-2 bg-amber-700/60 rotate-45"></div>*/}

                    {/*    <label htmlFor="niveau" className="block font-bold mb-4">*/}
                    {/*        Niveau:*/}
                    {/*    </label>*/}

                    {/*    <div className="relative">*/}
                    {/*        <input type="range" min="1" max="4" step="1"*/}
                    {/*            id="niveau"*/}
                    {/*            name="niveau"*/}
                    {/*            value={formData.niveau}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            className="relative z-10 w-full accent-red-600 cursor-pointer"*/}
                    {/*        />*/}

                    {/*        <div className="pointer-events-none absolute top-1/2 left-0 right-0 flex justify-between px-2 -translate-y-1/2">*/}
                    {/*            <div className="w-0.5 h-6 bg-black/60"></div>*/}
                    {/*            <div className="w-0.5 h-6 bg-black/60"></div>*/}
                    {/*            <div className="w-0.5 h-6 bg-black/60"></div>*/}
                    {/*            <div className="w-0.5 h-6 bg-black/60"></div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}


                    {/*    <div className="flex justify-between text-[10px] mt-2">*/}
                    {/*        <span>Beginner</span>*/}
                    {/*        <span>In ontwikkeling</span>*/}
                    {/*        <span>Gevorderd</span>*/}
                    {/*        <span>Expert</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="relative bg-(--christa-yellow) p-4 shadow-md">

                        <div className="absolute -top-2 -left-2 w-8 h-2 bg-amber-700/60 -rotate-45"></div>
                        <div className="absolute -top-2 -right-2 w-8 h-2 bg-amber-700/60 rotate-45"></div>

                        <label htmlFor="niveau" className="block font-bold mb-4">
                            Niveau:
                        </label>
                        <div className="relative">
                            {/* horizontale lijn */}
                            <div className="absolute left-0 right-0 top-6 h-0.5 bg-black"></div>

                            {/* slider punten */}
                            <div className="grid grid-cols-4">
                                {[1, 2, 3, 4].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                niveau: value,
                                            }))
                                        }
                                        className="relative flex h-12 justify-center"
                                    >
                                        {/* verticale lijn */}
                                        <span className="absolute top-0 h-12 w-0.5 bg-black"></span>

                                        {/* rode indicator */}
                                        {Number(formData.niveau) === value && (
                                            <span className="absolute top-4 z-30 h-5 w-5 rounded-full border-2 border-red-800 bg-red-600 shadow-md"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* labels */}
                            <div className="grid grid-cols-4 mt-3 text-[10px]">
                                <span className="text-center">Beginner</span>
                                <span className="text-center">In ontwikkeling</span>
                                <span className="text-center">Gevorderd</span>
                                <span className="text-center">Expert</span>
                            </div>
                        </div>


                        {/*<div className="relative flex items-center justify-between">*/}

                        {/*    /!* lijn *!/*/}
                        {/*    <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-black"></div>*/}


                        {/*    {[1, 2, 3, 4].map((value) => (*/}
                        {/*        <button*/}
                        {/*            key={value}*/}
                        {/*            type="button"*/}
                        {/*            onClick={() =>*/}
                        {/*                setFormData((prev) => ({*/}
                        {/*                    ...prev,*/}
                        {/*                    niveau: value,*/}
                        {/*                }))*/}
                        {/*            }*/}
                        {/*            className="relative z-20 flex h-12 w-12 items-center justify-center">*/}
                        {/*            <span className="absolute h-8 w-0.5 bg-black"></span>*/}

                        {/*            {Number(formData.niveau) === value && (*/}
                        {/*                <span className="relative z-30 h-5 w-5 rounded-full border-2 border-red-800 bg-red-600 shadow-md"></span>*/}
                        {/*            )}*/}
                        {/*        </button>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between text-[10px] mt-2">*/}
                        {/*    <span>Beginner</span>*/}
                        {/*    <span>In ontwikkeling</span>*/}
                        {/*    <span>Gevorderd</span>*/}
                        {/*    <span>Expert</span>*/}
                        {/*</div>*/}


                    </div>
                    <button type="submit" className="self-center mt-16 px-8 py-2 rounded-full bg-[#ddaefe] text-black border-2 border-white shadow-md font-bold hover:scale-105 transition">
                        Genereren
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Subtask