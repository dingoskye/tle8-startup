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
    const {fetchRegister, fetchUsers, users} = useLogin()
    const {refreshToken, token, loginData} = useApi()

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };

    useEffect(() => {
        document.title = "Board-it | Register";
        console.log(`------------Register-----------`)

        if (localStorage.getItem("token")) {
            async function removeToken() {

                await localStorage.removeItem("token");
            }

            removeToken()
        }
        setErrors({})
        fetchUsers();
    }, []);


    const handleSubmit = async (e) => {
        try {
            console.log(`------------Submit Handler-----------`)
            if (!isLoaded) return;

            e.preventDefault();
            setErrors({})
            const newErrors = {};

            // vallidatie:
            if (formData.password !== formData.repeatPassword) {
                newErrors.password = "Wachtwoord is niet hetzelfde.";
                newErrors.repeatPassword = "Wachtwoord is niet hetzelfde.";
            }
            if (formData.password === '') {
                newErrors.password = "verplichte velden moeten ingevuld zijn.";
            }

            if (formData.email === '') {
                newErrors.email = "verplichte velden moeten ingevuld zijn.";
            }

            if (formData.user_name === '') {
                newErrors.user_name = "verplichte velden moeten ingevuld zijn.";
            }

            if (formData.repeatPassword === '') {
                newErrors.repeatPassword = "verplichte velden moeten ingevuld zijn.";
            }

            for (let user of users) {
                if (formData.user_name === user.user_name) {
                    newErrors.user_name = "gebruikers naam wordt al gebruikt.";
                }
                if (formData.email === user.email) {
                    newErrors.email = "Email wordt al gebruikt.";
                }
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
        async function refresh() {
            if (!isLoaded) {
                setIsLoaded(true)
                return
            }
            await refreshToken()
        }

        refresh()
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


            <form className="h-full" onSubmit={handleSubmit}>
                <div className="pb-6 pt-6">
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
                </div>
                <div className="pb-6">
                    <Card variant="secondary">

                        <label htmlFor="picture" className="text-left text-xl font-headers mb-2">Foto:</label>
                        <InputCard>
                            <input className="bg-white min-w-full pl-3 py-2"
                                   type="file"
                                   id="picture"
                                   name="picture"
                                   value={formData.picture}

                                   onChange={handleInputChange}

                            />
                        </InputCard>

                    </Card>
                </div>
                <div className="pb-6">
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
                </div>
                <div className="pb-6">
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
                </div>
                <div className="w-[60%] md:w-[30%] mx-auto">
                    <SubmitButton>
                        Registreren
                    </SubmitButton>
                </div>
                <div className="text-center content-center w-full pt-2">
                    <Link to="/login">
                        Al een account?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register