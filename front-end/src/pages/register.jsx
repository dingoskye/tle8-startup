import Tape from "@/components/ui/tape.jsx";
import {Card} from "@/components/ui/cards.jsx";
import {SubmitButton} from "@/components/ui/buttons.jsx";
import InputCard from "@/components/ui/input-card.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useLogin} from "@/context/login-context.jsx";
import {useApi} from "@/context/api-context.jsx";


function Register() {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false);

    const [formData, setFormData,] = useState({
        user_name: "",
        picture: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [errors, setErrors] = useState([])
    const {fetchRegister, fetchUsers} = useLogin()
    const {refreshToken, token, loginData, setFirst} = useApi()

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };

    useEffect(() => {
        setFirst(false)
        document.title = "Board-it | Registeren";
        console.log(`------------Register-----------`)

        if (localStorage.getItem("token")) {
            async function removeToken() {

                await localStorage.removeItem("token");
            }

            removeToken()
        }
        localStorage.setItem("first", JSON.stringify(false))
        setErrors({})
        fetchUsers();
    }, []);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(`------------Submit Handler-----------`)
            if (!isLoaded) return;

            setErrors({})
            const newErrors = {};

            // vallidatie:
            if (!formData.picture.toLowerCase().endsWith(".png") && !formData.picture.toLowerCase().endsWith(".webp") && !formData.picture.toLowerCase().endsWith(".jpeg") && !formData.picture.toLowerCase().endsWith(".jpg") && formData.picture !== "") {
                newErrors.picture = "Gebruik een correcte foto format. (png, webp, jpeg, jpg)";
            }
            if (formData.password !== formData.repeatPassword) {
                newErrors.password = "Wachtwoord is niet hetzelfde.";
                newErrors.repeatPassword = "Wachtwoord is niet hetzelfde.";
            }
            if (formData.password === '') {
                newErrors.password = "Wachtwoord veld is verplicht.";
            }

            if (formData.email === '') {
                newErrors.email = "Email veld is verplicht.";
            }

            if (formData.user_name === '') {
                newErrors.user_name = "Gebruikersnaam veld is verplicht.";
            }

            if (formData.repeatPassword === '') {
                newErrors.repeatPassword = "Herhaal wachtwoord veld is verplicht.";
            }


            setErrors(newErrors);

// als er geen errors zijn zet het in local storage en stuur verder
            if (Object.keys(newErrors).length === 0) {
                fetchRegister(formData)
            }


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            setIsLoaded(true)
            return;
        }

        if (!loginData) return;

// als er een status boven de 300 (error) geef error anders navigeren naar home pagina.

        if (loginData.status > 300) {
            setErrors({
                user_name: "Gebruikersnaam of email wordt al gebruikt.",
                email: "Gebruikersnaam of email wordt al gebruikt.",

            });
        } else {

            async function refresh() {

                await refreshToken()
            }

            refresh()
        }
    }, [loginData]);


    useEffect(() => {
        if (!isLoaded) {
            setIsLoaded(true)
            return
        }
        if (!token) return;
        navigate("/");
    }, [token]);

    return (
        <div>
            <header role="banner" className="text-center p-1 mt-2 relative">
                <div className="bg-primary w-full p-4 rounded-lg shadow-md">
                    <Tape variant="big-r"/>
                    <Tape variant="big-l"/>
                    <h1 className="text-3xl font-headers">Registreren</h1>
                </div>
            </header>


            <form className="h-full flex gap-6 flex-col pt-6" onSubmit={handleSubmit}>

                <Card variant="quaternary">
                    <label htmlFor="user_name"
                           className="text-left text-xl font-headers mb-2 ">Gebruikersnaam:</label>
                    <InputCard>
                        <input className=" bg-white min-w-full pl-3 py-2"
                               type="text"
                               id="user_name"
                               name="user_name"
                               value={formData.userName}
                               placeholder="John Doe"
                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.user_name &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.user_name}</p>}
                </Card>


                <Card variant="secondary">

                    <label htmlFor="picture" className="text-left text-xl font-headers mb-2">Profielfoto:</label>
                    <InputCard>
                        <input className="bg-white min-w-full pl-3 py-2"
                               type="file"
                               id="picture"
                               name="picture"
                               value={formData.picture}

                               onChange={handleInputChange}

                        />
                    </InputCard>
                    {errors.picture &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.picture}</p>}
                </Card>

                <Card variant="tertiary">
                    <label htmlFor="email" className="text-left text-xl font-headers mb-2">Email:</label>
                    <InputCard>
                        <input className="bg-white min-w-full pl-3 py-2"
                               type="email"
                               id="email"
                               name="email"
                               placeholder="voorbeeld@email.com"
                               value={formData.email}

                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.email &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.email}</p>}
                </Card>

                <Card variant="primary">
                    <label htmlFor="password" className="text-left text-xl font-headers mb-2">Wachtwoord:</label>
                    <InputCard>
                        <input className="bg-white min-w-full pl-3 py-2"
                               type="password"
                               id="password"
                               name="password"
                               placeholder="wachtwoord123"
                               value={formData.password}

                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.password &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.password}</p>}

                    <label htmlFor="repeatPassword" className="text-left text-xl font-headers mb-2">Wachtwoord
                        herhalen:</label>
                    <InputCard>
                        <input className="bg-white min-w-full pl-3 py-2"
                               type="password"
                               id="repeatPassword"
                               name="repeatPassword"
                               placeholder="wachtwoord123"
                               value={formData.repeatPassword}

                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.repeatPassword &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.repeatPassword}</p>}

                </Card>

                <div className="w-[60%] md:w-[30%] mx-auto text-center flex flex-col gap-2">
                    <SubmitButton>
                        Registreren
                    </SubmitButton>
                    <Link to="/login" className="hover:text-blue-700 hover:underline">
                        Al een account?
                    </Link>
                </div>


            </form>
        </div>
    )
}

export default Register