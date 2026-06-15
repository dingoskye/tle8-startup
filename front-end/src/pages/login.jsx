import Tape from "@/components/ui/tape.jsx";
import {Card} from "@/components/ui/cards.jsx";
import {SubmitButton} from "@/components/ui/buttons.jsx";
import {useEffect, useState} from "react";
import {useLogin} from "@/context/login-context.jsx";
import InputCard from "@/components/ui/input-card.jsx";
import {useNavigate} from "react-router";
import {useApi} from "@/context/api-context.jsx";
import {Link} from "react-router";

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData,] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState([])
    const {fetchLogin, fetchUsers, users} = useLogin()
    const {loginData, token, refreshToken} = useApi()
    const [isLoaded, setIsLoaded] = useState(false);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    useEffect(() => {
        document.title = "Board-it | Login";
        console.log(`------------Login-----------`)
        if (localStorage.getItem("token")) {
            async function removeToken() {

                await localStorage.removeItem("token");
            }

            removeToken()
        }
        console.log(errors, 'errors')

        if (errors) {
            setErrors({})
        }
        fetchUsers();


    }, []);

    async function handleSubmit(e) {
        try {
            e.preventDefault();

            await setErrors({})
            const newErrors = {};


            if (formData.password === '') {
                newErrors.password = "Wachtwoord veld moet ingevuld zijn.";
            }

            if (formData.email === '') {
                newErrors.email = "Email veld moet ingevuld zijn.";
            }

            setErrors(newErrors);
// als er geen errors zijn ga verder
            if (Object.keys(newErrors).length === 0) {

                fetchLogin(formData)
            }


        } catch (err) {
            console.log(err);
        }
    }

// als de loginData veranderd, dan kijken of het een error is of het correct is


    useEffect(() => {
        console.log(`------------Login Data-----------`)
        if (!isLoaded) {
            console.log(`------------Initial Load-----------`)

            setIsLoaded(true)
            return;
        }
        console.log(`------------Is Loaded-----------`)

        if (!loginData) return;

// als er een status boven de 300 (error) geef error anders navigeren naar home pagina.

        if (loginData.status > 300) {
            setErrors({
                email: "Informatie is niet correct.",
                password: "Informatie is niet correct."
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
            console.log(`------------Initial Load-----------`)

            setIsLoaded(true)
            return;
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
                    <h1 className="text-3xl font-headers">Inloggen</h1>
                </div>
            </header>

            <form className=" h-full flex gap-6 flex-col pt-6" onSubmit={handleSubmit}>

                <Card variant="quaternary">
                    <label htmlFor="email"
                           className="text-left text-xl font-headers mb-2 ">Email: </label>
                    <InputCard>
                        <input className=" bg-white min-w-full pl-3 py-2"
                               type="email"
                               id="email"
                               name="email"
                               value={formData.email}
                               placeholder="voorbeeld@email.com"
                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.email &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.email}</p>}
                </Card>

                <Card variant="primary">
                    <label htmlFor="password"
                           className="text-left text-xl font-headers mb-2 ">Wachtwoord:</label>
                    <InputCard>
                        <input className=" bg-white min-w-full pl-3 py-2"
                               type="password"
                               id="password"
                               name="password"
                               value={formData.password}
                               placeholder="wachtwoord123"
                               onChange={handleInputChange}
                        />
                    </InputCard>
                    {errors.password &&
                        <p className="text-red-700 font-bold mt-2 text-sm">{errors.password}</p>}
                </Card>


                <div className="w-[60%] md:w-[30%] mx-auto flex flex-col gap-2 text-center">
                    <SubmitButton>
                        Login
                    </SubmitButton>
                    <Link to="/register" className="hover:text-blue-700 hover:underline">
                        Nog geen account?
                    </Link>

                </div>
            </form>

        </div>
    )
}

export default Login