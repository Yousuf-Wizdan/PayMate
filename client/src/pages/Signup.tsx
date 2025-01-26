import { useRef, useState } from "react"
import axios from "axios";
import CustomInputBox from "../components/CustomInputBox";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";



function Signup(){
    const [loading , setLoading] = useState(false)
    const firstnameRef = useRef<HTMLInputElement>();
    const lastnameRef = useRef<HTMLInputElement>();
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    async function submitHandler(){
        const firstName = firstnameRef.current?.value
        const lastName = lastnameRef.current?.value
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        setLoading(true)

            await axios.post(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/user/signup` , {
                firstName,
                lastName,
                username,
                password
            })
            .then(() => {
                navigate('/signin')
                setLoading(false)
            }).catch((err) =>{
                console.log(err)
                setLoading(false)
            })
    }
    return(
        <div className="h-screen w-screen bg-gray-500 flex items-center justify-center">
            <div className="bg-white w-96 h-5/6 rounded-md p-5">
                <div className="text-center text-4xl font-bold">
                    Sign Up
                </div>
                <div className="text-lg text-gray-500 text-center mt-2">
                    Enter your information to create an account
                </div>
                <CustomInputBox placeholder="John" type="text" title="First Name" reference={firstnameRef} />
                <CustomInputBox placeholder='Doe' type="text" title="Last Name" reference={lastnameRef} />
                <CustomInputBox placeholder='johndoe@example.com' type="text" title="Username" reference={usernameRef} />
                <CustomInputBox type="password" title="Password" reference={passwordRef} />
                <div className="flex justify-center">
                    <button onClick={submitHandler} className="bg-black h-10 w-full mt-3 rounded-lg text-white">Submit</button>
                </div>
                <div className="text-center mt-3">
                    Already have a account? <a className="underline" href="/signin">Login</a>
                </div>
                <div>
                    {loading && <Loader />}
                </div>
            </div>
        </div>
    )
}

export default Signup


