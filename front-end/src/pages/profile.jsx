import Tape from "@/components/ui/tape.jsx";

function Profile() {
    return (
        <>
            <header role="banner" className="text-center p-1 mt-1 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-2xl font-headers">Welkom John Doe</h1>
                </div>
            </header>

            
        </>
    )
}

export default Profile