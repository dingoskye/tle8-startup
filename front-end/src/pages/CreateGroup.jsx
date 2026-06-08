import {useEffect, useState} from 'react';
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Punaise from "@/components/ui/punaise.jsx";

// MOCK DATA: Acting as a temporary database for the frontend prototype.
// Once the backend is connected, this will be replaced by an API fetch call.
const mockFriendsList = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Barry Berry'},
    {id: '3', name: 'Gary Berry'},
    {id: '4', name: 'Patrick Star'}
];

const CreateGroup = () => {

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | Create group";
    }, []);

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const removeMember = (idToRemove) => {
        setSelectedMembers(selectedMembers.filter(member => member.id !== idToRemove));
    };
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

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
            newErrors.name = "Name cannot be empty or just spaces.";
        }

        // --- RULE 2: Description ---
        if (!description || description.trim() === "") {
            newErrors.description = "Please provide a description.";
        }

        // --- RULE 3: Photo limit (Max 5MB) ---
        if (photo && photo.size > 0) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (photo.size > maxSizeInBytes) {
                newErrors.photo = "The image is too large! Maximum size is 5MB.";
            }
        }

        // --- RULE 4: Members limit (Min 1, Max 10) ---
        if (selectedMembers.length === 0) {
            newErrors.members = "You must add at least one member to the group.";
        } else if (selectedMembers.length > 10) {
            newErrors.members = "You can only add a maximum of 10 members.";
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
            // We append the selected members to the formData
            // For a file upload (FormData), we need to send the members array properly.
            // A common way is to send it as a JSON string.
            formData.append('members', JSON.stringify(selectedMembers.map(m => m.id)));

            // Replace 'http://localhost:8080/api/groups' with your actual backend URL
            const response = await fetch('http://127.0.0.1:8000', {
                method: 'POST',

                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);

            // Clear form and show success
            e.target.reset();
            setSelectedMembers([]);
            setSubmitMessage({type: 'success', text: 'Group created successfully!'});

        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitMessage({
                type: 'error',
                text: 'Failed to create group. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-background w-full min-h-screen flex flex-col pb-10">

            {/* --- HEADER SECTION --- */}
            <header role="banner" className="text-center p-1 mt-10 mb-10 relative">
                <div className="bg-primary w-[70%] mx-auto p-4 rounded-lg shadow-md relative">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-3xl font-bold font-headers">Create Group</h1>
                </div>
            </header>

            {submitMessage && (
                <div
                    className={`mx-auto mb-6 p-4 rounded w-[70%] text-center font-bold ${submitMessage.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {submitMessage.text}
                </div>
            )}

            <form className="flex flex-col items-center gap-6" onSubmit={handleCreateGroup}>

                {/* --- NAAM SECTION --- */}
                <div className="w-[70%]">
                    <Card variant="tertiary">
                        <label htmlFor="naam" className="block mb-2 font-bold text-lg">Naam</label>
                        <div className="w-full relative">

                            <Tape variant="small-r"/>
                            <Tape variant="small-l"/>

                            <input
                                id="naam"
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pt-2 pb-3"
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                            />
                            {errors.name && <p className="text-red-700 font-bold mt-2 text-sm">{errors.name}</p>}
                        </div>
                    </Card>
                </div>

                {/* --- BESCHRIJVING SECTION --- */}
                <div className="w-[70%]">
                    <Card variant="quaternary">
                        <label htmlFor="beschrijving" className="block mb-2 font-bold text-lg">Beschrijving</label>

                        <div className="relative">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <textarea
                                id="beschrijving"
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20"
                                name="description"
                                placeholder="geeft hier context over jou hoofdtaak"

                            />
                            {errors.description &&
                                <p className="text-red-700 font-bold mt-2 text-sm">{errors.description}</p>}
                        </div>
                    </Card>
                </div>

                {/* --- FOTO SECTION --- */}
                <div className="w-[70%] ">
                    <Card variant="secondary">

                        <label htmlFor="foto" className="block mb-2 font-bold text-lg">Foto</label>
                        <div className="relative">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <input
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20 cursor-pointer"
                                type="file"
                                id="foto"
                                name="photo"
                                accept="image/png, image/jpeg, image/webp"
                            />
                        </div>
                        {errors.photo && <p className="text-red-700 font-bold mt-2 text-sm">{errors.photo}</p>}
                    </Card>
                </div>

                {/* --- LEDEN (MEMBERS) SECTION --- */}
                <div className="w-[70%]">
                    <Card variant="white">
                        <h2 className="block text-2xl font-bold mb-4">Leden:</h2>
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
                                        // This filters out the clicked member, effectively removing them from the array
                                        onClick={() => setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))}
                                        className="z-10 hover  cursor-pointer"
                                        aria-label={`Verwijder ${member.name}`}
                                        title="Verwijder lid"
                                    >

                                        <Punaise/>
                                    </button>

                                    <span
                                        className="text-xs mb-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center font-bold">{member.name}
                                    </span>

                                    {/* Placeholder Avatar */}
                                    <div className="w-8 h-8 border-2 border-black rounded-full mb-1"></div>
                                    <div className="w-12 h-6 border-2 border-black border-b-0 rounded-t-full"></div>
                                </div>
                            ))}

                            {/* --- DROPDOWN MENU LOGIC --- */}
                            <div className="relative">
                                <button
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-button-purple text-black px-8 py-2 rounded-full border-4 border-white shadow-md font-bold hover:scale-105 transition-transform mb-10 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isSubmitting ? 'Bezig met aanmaken...' : 'Aanmaken'}
                </button>
            </form>
        </main>
    );
};

export default CreateGroup;