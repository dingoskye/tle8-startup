import {useState} from 'react';

// MOCK DATA: Acting as a temporary database for the frontend prototype.
// Once the backend is connected, this will be replaced by an API fetch call.
const mockFriendsList = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Barry Berry'},
    {id: '3', name: 'Gary Berry'},
    {id: '4', name: 'Patrick Star'}
];

const CreateGroup = () => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [errors, setErrors] = useState({});

    const handleCreateGroup = (e) => {
        e.preventDefault();

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

        setErrors({});
        console.log("Validation passed! Ready to save to the database.");
    };

    return (
        <main className="bg-[var(--background)] w-full min-h-screen flex flex-col pb-10">
            <div className="flex justify-center items-center mb-20 m-10">
                <h1 className="text-3xl font-bold underline">Create Group</h1>
            </div>

            <form className="flex flex-col items-center gap-6" onSubmit={handleCreateGroup}>

                {/* --- NAAM SECTION --- */}
                <div className="relative bg-[var(--christa-yellow)] w-[70%] p-6 shadow-lg rounded-sm mb-6">
                    <div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--ruas-red)] rounded-full shadow-md border border-red-900"></div>
                    <label htmlFor="naam">Naam</label>
                    <div className="w-full">
                        <input
                            id="naam"
                            className="w-full bg-[var(--thoas-white)] shadow-xl/15 rounded-[3px] pl-5 pt-2 pb-3"
                            type="text"
                            name="name"
                            placeholder="e.g. John Doe"
                        />
                        {errors.name && <p className="text-red-700 font-bold mt-2 text-sm">{errors.name}</p>}
                    </div>
                </div>

                {/* --- BESCHRIJVING SECTION --- */}
                <div className="relative bg-[var(--flamingo-pink)] w-[70%] p-6 shadow-lg rounded-sm mb-6">
                    <div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--ruas-red)] rounded-full shadow-md border border-red-900"></div>
                    <label htmlFor="beschrijving" className="block mb-2 font-bold text-lg">Beschrijving</label>
                    <div className="w-full">
                        <textarea
                            id="beschrijving"
                            className="w-full bg-[var(--thoas-white)] shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20"
                            name="description" /* Fixed: Changed from "name" to "description" so validation catches it */
                            placeholder="geeft hier context over jou hoofdtaak"
                        />
                        {errors.description &&
                            <p className="text-red-700 font-bold mt-2 text-sm">{errors.description}</p>}
                    </div>
                </div>

                {/* --- FOTO SECTION --- */}
                <div className="relative bg-[var(--jade-green)] w-[70%] p-6 shadow-lg rounded-sm mb-6">
                    <div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--ruas-red)] rounded-full shadow-md border border-red-900"></div>
                    <label htmlFor="foto" className="block mb-2 font-bold text-lg">Foto</label>
                    <input
                        className="w-full bg-[var(--thoas-white)] shadow-xl/15 rounded-[3px] pl-5 pr-5 pt-2 pb-20"
                        type="file"
                        id="foto"
                        name="photo" /* Fixed: Changed from "foto" to "photo" to match English validation */
                        accept="image/png, image/jpeg, image/webp"
                    />
                    {errors.photo && <p className="text-red-700 font-bold mt-2 text-sm">{errors.photo}</p>}
                </div>

                {/* --- LEDEN (MEMBERS) SECTION --- */}
                <div className="relative bg-[var(--thoas-white)] w-[70%] p-6 shadow-lg rounded-sm mb-6">
                    <div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--ruas-red)] rounded-full shadow-md border border-red-900"></div>

                    <h2 className="block text-2xl font-bold mb-4">Leden:</h2>
                    {/* Fixed: This was displaying the photo error, changed it to errors.members */}
                    {errors.members && <p className="text-red-700 font-bold mb-4 text-sm">{errors.members}</p>}

                    <div
                        className="relative bg-[var(--skye-blue)] w-full p-4 shadow-inner rounded-sm min-h-[140px] flex items-center gap-4 flex-wrap">

                        {selectedMembers.map((member) => (
                            <div key={member.id}
                                 className="bg-[var(--thoas-white)] p-2 rounded-sm shadow-md flex flex-col items-center w-20">
                                <span className="text-xs mb-2 whitespace-nowrap">{member.name}</span>
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
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E0B0FF] border-4 border-white shadow-lg text-2xl font-bold hover:scale-105 transition-transform"
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
                </div>

                <button
                    className="bg-[#d8a7f4] text-black px-8 py-2 rounded-full border-4 border-white shadow-md font-bold hover:scale-105 transition-transform">
                    Aanmaken
                </button>
            </form>
        </main>
    );
};

export default CreateGroup;