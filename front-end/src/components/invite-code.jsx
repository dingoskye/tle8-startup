import {Card, TapeCard} from "@/components/ui/cards.jsx";
import {useEffect, useState} from "react";

import {useGroup} from "@/context/group-context.jsx";
import {SubmitButton} from "@/components/ui/buttons.jsx";

import {Link, useNavigate, useParams} from "react-router";
import Punaise from "@/components/ui/punaise.jsx";
import PopUp from "@/components/pop-up.jsx";

export function InviteCode({f}) {
    const params = useParams()
    // de id van de groep.
    const {fetchCode, code} = useGroup()

    useEffect(() => {
        const group = params.id
        if (group) {
            fetchCode(group)
        }
    }, []);


    return (
        <PopUp link={false} onClose={f}>
            <h1 className="text-2xl font-headers">
                Invite code:
            </h1>
            <TapeCard variant="tertiary">
                {code ? code : 'geen code'}
            </TapeCard>
        </PopUp>
    )
}

export function AcceptInvite({f}) {
    const {fetchAccept, acceptData} = useGroup()
    // code opvangen om door te sturen naar de backend
    const [formData, setFormData,] = useState({
        code: ""
    })
    const [errors, setErrors] = useState([])
    const newErrors = {};
    const navigate = useNavigate();

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
            navigate("/")
        } catch ($e) {
            console.log($e)
        }
    }


    return (
        <PopUp link={false} onClose={f}>
            <h1 className="text-2xl font-headers">
                Invite accepteren:
            </h1>
            <TapeCard variant="tertiary">
                <form onSubmit={handleSubmit}>
                    <label className="font-paragraph text-lg font-semibold" htmlFor="code">Invite
                        code:</label>
                    <input
                        className=" bg-bg-white min-w-full pl-3 py-2 text-text"
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
                {errors.code &&
                    <p className="text-red-700 font-bold mt-2 text-sm">{errors.code}</p>}
            </TapeCard>

        </PopUp>
    )
}

