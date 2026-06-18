import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {useEffect, useState} from "react";

import {useGroup} from "@/context/group-context.jsx";
import {SubmitButton} from "@/components/ui/buttons.jsx";

import {Link, useNavigate, useParams} from "react-router";
import Punaise from "@/components/ui/punaise.jsx";

export function InviteCode() {
    const params = useParams()
    // de id van de groep.
    const {fetchCode, code} = useGroup()
    const navigate = useNavigate();

    useEffect(() => {
        const group = params.id
        if (group) {
            fetchCode(group)
        }
    }, []);


    return (
        <>
            <Card variant="tertiary">
                <h1 className="text-2xl font-headers">
                    Invite code:
                </h1>
                <TapeCard variant="white">
                    {code ? code : 'geen code'}
                </TapeCard>
            </Card>
        </>
    )
}

export function AcceptInvite() {
    const {fetchAccept, acceptData} = useGroup()
    // code opvangen om door te sturen naar de backend
    const [formData, setFormData,] = useState({
        code: ""
    })
    const [errors, setErrors] = useState([])
    const newErrors = {};
    const location = useLocation();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }


    useEffect(() => {
        if (acceptData) {
            if (acceptData.status === 404) {
                newErrors.code = "Code niet correct";
            } else if (acceptData.status > 300) {
                newErrors.code = "Al in de groep.";
            } else {
                setErrors({})
            }
            setErrors(newErrors)
        }
    }, [acceptData]);

    function handleSubmit(e) {
        try {
            e.preventDefault();

            if (formData.code === "") {
                newErrors.code = "Code moet ingevuld worden";
                return setErrors(newErrors)
            }
            fetchAccept(formData)
            location("/")
        } catch ($e) {
            console.log($e)
        }
    }


    return (
        <>
            <Card variant="tertiary">
                <h1 className="text-2xl font-headers">
                    Invite accepteren:
                </h1>
                <TapeCard variant="white">
                    <form onSubmit={handleSubmit}>
                        <label>
                            invite code:
                        </label>

                        <input
                            className=" bg-white min-w-full pl-3 py-2"
                            type="text"
                            id="code"
                            name="code"
                            value={formData?.code}
                            placeholder="jf33lj12"
                            onChange={handleInputChange}
                        />
                        <div className="w-[60%] self-center mx-auto pt-5">
                            <SubmitButton>
                                Accept
                            </SubmitButton>
                        </div>
                    </form>

                </TapeCard>
                {errors.code &&
                    <p className="text-red-700 font-bold mt-2 text-sm">{errors.code}</p>}
            </Card>


        </>
    )
}

