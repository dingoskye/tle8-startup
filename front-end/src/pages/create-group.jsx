import {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card} from "@/components/ui/cards.jsx";
import Tape from "@/components/ui/tape.jsx";
import Punaise from "@/components/ui/punaise.jsx";
import {useApi} from "@/context/api-context.jsx";
import {User} from 'lucide-react';
import {MainButton} from "@/components/ui/buttons.jsx";

const currentUser = {id: '1', name: 'Jij', user_name: 'mijn_account'};

const CreateGroup = () => {
    const navigate = useNavigate();

    //documenten titels voor WCAG!!
    useEffect(() => {
        document.title = "Board-it | studiegroep aanmaken";
    }, []);

    const [selectedMembers, setSelectedMembers] = useState([currentUser]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const {apiFetch} = useApi();
    const plusButtonRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [availableUsers, setAvailableUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const users = await apiFetch('/user');


                const filteredUsers = users.filter(user => String(user.id) !== String(currentUser.id));


                setAvailableUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [apiFetch]);

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        // Reset messages
        setSubmitMessage(null);
        setErrors({});

        const newErrors = {};
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const photo = formData.get('photo');

        // --- RULE 1: Name ---
        if (!name || name.trim() === "") {
            newErrors.name = "Naam kan niet leeg zijn of alleen uit spaties bestaan.";
        }

        // --- RULE 2: Photo limit (Max 5MB) ---
        if (photo && photo.size > 0) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (photo.size > maxSizeInBytes) {
                newErrors.photo = "De afbeelding is te groot! Maximale grootte is 5MB.";
            }
        }

        // --- RULE 3: Members limit (Min 1, Max 10) ---
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
            // 1. Give the backend the 'role' and 'user_id' it demands to bypass the 404 error!
            formData.append('role', 'admin');
            formData.append('user_id', currentUser.id);

            // 2. Rename 'photo' to 'image' so your Laravel controller can find it
            const photoFile = formData.get('photo');
            if (photoFile && photoFile.size > 0) {
                formData.append('image', photoFile);
                formData.delete('photo'); // Clean up the old name
            }

            formData.append('members', JSON.stringify(selectedMembers.map(m => m.id)));

            // Send it to Laravel
            const data = await apiFetch('/group/create', {
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
                <div className="bg-primary  mx-auto p-4 rounded-lg shadow-md relative">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-3xl  font-headers">Groep aanmaken</h1>
                </div>
            </header>

            {submitMessage && (
                <div
                    className={`mx-auto mb-6 p-4 rounded  text-center font-bold ${submitMessage.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {submitMessage.text}
                </div>
            )}

            <form className="flex flex-col items-center gap-6 w-full" onSubmit={handleCreateGroup}>

                {/* --- NAME SECTION --- */}
                <div className="w-full relative">
                    <Card variant="tertiary">
                        <label htmlFor="name" className="block mb-2 font-headers text-lg">Naam</label>
                        {errors.name &&
                            <p className="text-red-700 font-bold  mt-2 text-sm">{errors.name}</p>}


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
                            <div>


                            </div>
                        </div>
                    </Card>
                </div>

                {/* --- DESCRIPTION SECTION --- */}
                <div className="w-full relative">
                    <Card variant="quaternary">
                        <label htmlFor="description" className="block mb-2 font-headers text-lg">Beschrijving</label>

                        <div className="relative">
                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            <textarea
                                id="description"
                                className="w-full bg-bg-white shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20"
                                name="description"
                                placeholder="geeft hier Beschrijving over jou hoofdtaak"

                            />
                        </div>
                    </Card>
                </div>

                {/* --- PHOTO SECTION --- */}
                <div className="w-full relative">
                    <Card variant="secondary">

                        <label htmlFor="photo" className="block mb-2 font-headers text-lg">Foto</label>
                        {errors.photo && <p className="text-red-700 font-bold mt-2 text-sm">{errors.photo}</p>}

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
                    </Card>
                </div>


                {/* --- MEMBERS SECTION --- */}
                <div className="w-full relative">
                    <Card variant="white">
                        <h2 className="block text-2xl font-headers mb-4">Leden:</h2>
                        {errors.members && <p className="text-red-700 font-bold mb-4 text-sm">{errors.members}</p>}

                        <div
                            className="relative bg-primary w-full p-4 shadow-inner rounded-sm min-h-40 pb-7 flex items-center gap-4 flex-wrap">

                            <Tape variant="big-r"/>
                            <Tape variant="big-l"/>
                            {selectedMembers.map((member) => (
                                <div key={member.id}
                                     className="relative mt-4 bg-bg-white p-2 pt-4 rounded-sm shadow-md flex flex-col items-center shrink-0 w-24">

                                    {/* --- THE CLICKABLE PUNAISE --- */}

                                    {member.id !== currentUser.id && (
                                        <button

                                            onClick={() => setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))}
                                            className="z-10 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black hover:scale-110 transition-transform"
                                            aria-label={`Verwijder ${member.username}`}
                                            title="Verwijder lid"
                                        >
                                            <Punaise/>
                                        </button>
                                    )}

                                    {/* Placeholder Avatar */}
                                    <User
                                        className="w-10 h-10 mb-1 mt-4 text-black  bg-bg-white border-2 border-black rounded-full p-1"/>

                                    <p className="text-xs mb-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center font-bold">
                                        @{member.user_name}
                                    </p>
                                </div>
                            ))}

                            {/* --- DROPDOWN MENU LOGIC --- */}
                            <div className="relative">
                                <button
                                    ref={plusButtonRef}
                                    type="button"
                                    aria-label="Voeg een lid toe"
                                    onClick={() => {
                                        setIsMenuOpen(!isMenuOpen);
                                        setSearchQuery("");
                                    }}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-button-purple border-4 border-white shadow-lg text-2xl font-bold hover:scale-105 transition-transform"
                                >
                                    +
                                </button>

                                {isMenuOpen && (
                                    <div
                                        className="absolute top-14 left-0 bg-white shadow-xl rounded-md w-56 z-10 border border-gray-200 overflow-hidden flex flex-col">

                                        {/* SEARCH INPUT */}
                                        <div className="p-2 border-b bg-gray-50">
                                            <input
                                                type="text"
                                                placeholder="Zoek op naam..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                autoFocus
                                                className="w-full px-2 py-1 text-sm bg-bg-white text-text font-paragraph border-2 border-text/20 rounded focus:outline-none focus:border-button-purple focus:ring-1 focus:ring-button-purple"/>
                                        </div>

                                        {/* MEMBER LIST */}
                                        <ul className="list-none p-0 m-0 max-h-48 overflow-y-auto">

                                            {/* 1. FILTER AND MAP THE REAL MEMBERS */}
                                            {availableUsers
                                                .filter((friend) => !selectedMembers.some((m) => m.id === friend.id))
                                                .filter((friend) => friend.user_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((friend) => (
                                                    <li key={friend.id}>
                                                        <button
                                                            type="button"
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-0"
                                                            onClick={() => {
                                                                if (!selectedMembers.find(m => m.id === friend.id)) {
                                                                    setSelectedMembers([...selectedMembers, friend]);
                                                                }
                                                                setIsMenuOpen(false);
                                                                setSearchQuery("");

                                                                setTimeout(() => {
                                                                    if (plusButtonRef.current) {
                                                                        plusButtonRef.current.focus();
                                                                    }
                                                                }, 0);
                                                            }}
                                                        >
                                                            @{friend.user_name}
                                                        </button>
                                                    </li>
                                                ))}

                                            {/* 2. THE EMPTY STATE */}
                                            {availableUsers
                                                .filter((friend) => !selectedMembers.some((m) => m.id === friend.id))
                                                .filter((friend) => friend.user_name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .length === 0 && (
                                                <li className="px-4 py-3 text-sm text-gray-500 text-center italic">
                                                    Geen resultaten gevonden.
                                                </li>
                                            )}

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>


                <div>
                    <div>
                        <MainButton
                            me="w-full"
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