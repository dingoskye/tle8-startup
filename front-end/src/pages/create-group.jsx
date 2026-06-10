import {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Punaise from "@/components/ui/punaise.jsx";
import { useApi } from "@/context/api-context.jsx";
import { User } from 'lucide-react';
import {MainButton} from "@/components/ui/buttons.jsx";
// MOCK DATA: Acting as a temporary database for the frontend prototype.

const mockFriendsList = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Barry Berry'},
    {id: '3', name: 'Gary Berry'},
    {id: '4', name: 'Patrick Star'}
];

const CreateGroup = () => {
    const navigate = useNavigate();

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | studiengroep aanmaken";
    }, []);

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const { apiFetch } = useApi();
    const plusButtonRef = useRef(null);

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        // Reset messages
        setSubmitMessage(null);
        setErrors({});

        const newErrors = {};
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const description = formData.get('description');
        const photo = formData.get('photo');

        // --- RULE 1: Name ---
        if (!name || name.trim() === "") {
            newErrors.name = "Naam kan niet leeg zijn of alleen uit spaties bestaan.";
        }

        // --- RULE 2: Description ---
        if (!description || description.trim() === "") {
            newErrors.description = "Geef een beschrijving.";
        }

        // --- RULE 3: Photo limit (Max 5MB) ---
        if (photo && photo.size > 0) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (photo.size > maxSizeInBytes) {
                newErrors.photo = "De afbeelding is te groot! Maximale grootte is 5MB.";
            }
        }

        // --- RULE 4: Members limit (Min 1, Max 10) ---
        if (selectedMembers.length === 0) {
            newErrors.members = "Je moet minstens één lid aan de groep toevoegen.";
        } else if (selectedMembers.length > 10) {
            newErrors.members = "Je kunt maximaal 10 leden toevoegen.";
        }

        // --- CHECK RESULTS ---
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Validation passed! Ready to save to the database.");

        // --- SEND TO BACKEND ---
        setIsSubmitting(true);

        try {
            formData.append('members', JSON.stringify(selectedMembers.map(m => m.id)));

            // 1. Use apiFetch instead of standard fetch.
            // 2. Set the endpoint path
            const data = await apiFetch('/api/group/create', {
                method: 'POST',
                body: formData,
            });

            // Handle success response
            console.log("Success:", data);

            setSubmitMessage({type: 'success', text: 'Groep succesvol aangemaakt! U wordt nu doorgestuurd...'});

            setTimeout(() => {
                // Assuming the backend returns the new ID as data.id
                navigate(`/studiegroepen/${data.id}`);
            }, 2000);

        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitMessage({
                type: 'error',
                text: 'Het aanmaken van de groep is mislukt. Controleer uw verbinding en probeer het opnieuw.'
            });
            setIsSubmitting(false);
        }
    };

    return (
        <>

            {/* --- HEADER SECTION --- */}
            <header role="banner" className="text-center p-1 mt-10 mb-10 relative">
                <div className="bg-primary w-[80%] mx-auto p-4 rounded-lg shadow-md relative">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-3xl  font-headers">Groep aanmaken</h1>
                </div>
            </header>

            {submitMessage && (
                <div
                    className={`mx-auto mb-6 p-4 rounded w-[70%] text-center font-bold ${submitMessage.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {submitMessage.text}
                </div>
            )}

            <form className="flex flex-col items-center gap-6 w-full" onSubmit={handleCreateGroup}>

                {/* --- NAME SECTION --- */}
                <div className="w-[80%]">
                    <Card variant="tertiary">
                        <label htmlFor="name" className="block mb-2 font-headers text-lg">Naam</label>
                        <div className="w-full relative">

                            <Tape variant="small-r"/>
                            <Tape variant="small-l"/>

                            <input
                                id="name"
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pt-2 pb-3"
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                            />
                            {errors.name && <p className="text-red-700 font-bold mt-2 text-sm">{errors.name}</p>}
                        </div>
                    </Card>
                </div>

                {/* --- DESCRIPTION SECTION --- */}
                <div className="w-[80%]">
                    <Card variant="quaternary">
                        <label htmlFor="description" className="block mb-2 font-headers text-lg">Beschrijving</label>

                        <div className="relative">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <textarea
                                id="description"
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20"
                                name="description"
                                placeholder="geeft hier context over jou hoofdtaak"

                            />
                            {errors.description &&
                                <p className="text-red-700 font-bold mt-2 text-sm">{errors.description}</p>}
                        </div>
                    </Card>
                </div>

                {/* --- PHOTO SECTION --- */}
                <div className="w-[80%]">
                    <Card variant="secondary">

                        <label htmlFor="photo" className="block mb-2 font-headers text-lg">Foto</label>
                        <div className="relative">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <input
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20 cursor-pointer"
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/png, image/jpeg, image/webp"
                            />
                        </div>
                        {errors.photo && <p className="text-red-700 font-bold mt-2 text-sm">{errors.photo}</p>}
                    </Card>
                </div>

                {/* --- LEADERBOARD SECTION --- */}
                <div className="w-[80%]">
                    <Card variant="tertiary">
                        {/* Added gap-4 here so they don't collide */}
                        <div className="flex items-center justify-between w-full gap-4">

                            {/* Added flex-1 here so the text wraps nicely on mobile */}
                            <div className="flex-1">
                                <label htmlFor="leaderboard" className="block font-headers text-lg cursor-pointer">
                                    Leaderboard Toevoegen?
                                </label>
                                <p className="text-sm opacity-80 mt-1">
                                    Vink dit aan als je een ranglijst wilt bijhouden voor deze groep.
                                </p>
                            </div>

                            {/* Added shrink-0 here so the checkbox never gets squished or pushed out */}
                            <input
                                id="leaderboard"
                                name="leaderboard"
                                type="checkbox"
                                className="shrink-0 w-8 h-8 cursor-pointer accent-button-purple bg-bg-white border-2 border-black rounded-md shadow-sm transition-transform hover:scale-110"
                            />
                        </div>
                    </Card>
                </div>

                {/* --- MEMBERS SECTION --- */}
                <div className="w-[80%]">
                    <Card variant="white">
                        <h2 className="block text-2xl font-headers mb-4">Leden:</h2>
                        {errors.members && <p className="text-red-700 font-bold mb-4 text-sm">{errors.members}</p>}

                        <div
                            className="relative bg-primary w-full p-4 shadow-inner rounded-sm min-h-[140px] flex items-center gap-4 flex-wrap">

                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            {selectedMembers.map((member) => (
                                <div key={member.id}
                                     className="relative mt-4 bg-bg-white p-2 pt-4 rounded-sm shadow-md flex flex-col items-center shrink-0 w-24">

                                    {/* --- THE CLICKABLE PUNAISE --- */}

                                    <button
                                        type="button"
                                        onClick={() => setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))}
                                         className="z-10 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black hover:scale-110 transition-transform"
                                        aria-label={`Verwijder ${member.name}`}
                                        title="Verwijder lid"
                                    >
                                        <Punaise/>
                                    </button>

                                    {/* Placeholder Avatar */}
                                    <User className="w-10 h-10 mb-1 text-black bg-bg-white border-2 border-black rounded-full p-1" />

                                    <p
                                        className="text-xs mb-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center font-bold">{member.name}
                                    </p>
                                </div>
                            ))}

                            {/* --- DROPDOWN MENU LOGIC --- */}
                            <div className="relative">
                                <button
                                    ref={plusButtonRef}
                                    type="button"
                                    aria-label="Voeg een lid toe"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-button-purple border-4 border-white shadow-lg text-2xl font-bold hover:scale-105 transition-transform"
                                >
                                    +
                                </button>

                                {isMenuOpen && (
                                    <ul className="absolute top-14 left-0 bg-white shadow-xl rounded-md w-48 z-10 border border-gray-200 overflow-hidden list-none p-0 m-0">
                                        {mockFriendsList.map((friend) => (
                                            <li key={friend.id}>
                                                <button
                                                    type="button"
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-0"
                                                    onClick={() => {
                                                        if (!selectedMembers.find(m => m.id === friend.id)) {
                                                            setSelectedMembers([...selectedMembers, friend]);
                                                        }
                                                        setIsMenuOpen(false);

                                                        setTimeout(() => {
                                                            if (plusButtonRef.current) {
                                                                plusButtonRef.current.focus();
                                                            }
                                                        }, 0);
                                                    }}
                                                >
                                                    {friend.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>


            <div>
                <div>
                    <MainButton
                        className="mt-2 mb-2 ml-3 mr-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Bezig met aanmaken...' : 'Aanmaken'}
                    </MainButton>
                </div>
            </div>
            </form>

        </>
    );
};

export default CreateGroup;