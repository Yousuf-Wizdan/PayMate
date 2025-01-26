import { useRef, useState } from "react";
import CustomInputBox from "../components/CustomInputBox"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

function Signin(){
    const [loading , setLoading] = useState(false)
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate() 

    async function submitHandler(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        setLoading(true)
        await axios.post(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/user/signin` , {
            username,
            password
        })
        .then((response) => {
            const token = response.data.token
            localStorage.setItem('token' , token)
            navigate('/dashboard')
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    return(
        <div className="h-screen w-screen bg-gray-500 flex items-center justify-center">
            <div className="bg-white w-96 h-108 rounded-md p-5">
                <div className="text-center text-4xl font-bold">
                    Sign In
                </div>
                <div className="text-lg text-gray-500 text-center mt-2">
                    Enter your Credentials to access your account
                </div>
                <CustomInputBox placeholder="johndoe@example.com" type="text" title="Username" reference={usernameRef} />
                <CustomInputBox  type="password" title="Password" reference={passwordRef} />
                <div className="flex justify-center">
                    <button onClick={submitHandler} className="bg-black h-10 w-full mt-3 rounded-lg text-white">Submit</button>
                </div>
                <div className="text-center mt-3">
                    Don't have a account? <a className="underline" href="/signup">Sign Up</a>
                </div>
                <div>
                    {loading && <Loader />}
                </div>
            </div>
        </div>
    )
}

export default Signin;