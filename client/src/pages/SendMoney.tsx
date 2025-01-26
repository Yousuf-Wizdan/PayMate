import axios from "axios"
import {useState} from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "../components/Loader"

export const SendMoney = () => {
    const [loading , setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [amount , setAmount] = useState<any>(0)
    const navigate = useNavigate()
    // const [error , setError] = useState('')
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="border border-gray-200 rounded-md shadow-lg h-96 w-120 p-5 ">
                <div className="text-3xl text-center font-bold mt-5 mb-15">
                    Send Money
                </div>
                <div className="flex items-center gap-5">
                    <div className="h-15 w-15 rounded-full bg-green-400 font-bold text-3xl text-white flex items-center justify-center">
                        <div>
                            {name ? name[0] : "Friend's name"}
                        </div>
                    </div>
                    <div className="text-2xl font-bold">
                        {name}
                    </div>
                </div>
                <div className="font-bold text-md mt-4">
                    Amount (in Rs)
                </div>
                <div className="border border-gray-300 rounded-md mt-2 mb-4">
                    <input onChange={(e) => setAmount(e.target.value)} type="number" className="p-2 outline-none" placeholder="Enter Amount" />
                </div>
                <div className="bg-green-400  rounded-lg font-bold text-center text-white cursor-pointer">
                    <button className={'cursor-pointer p-3'} onClick={() => {
                        setLoading(true)
                        axios.post(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/account/transfer` , {
                            to: id,
                            amount
                        } , {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then((response) => {
                            console.log(response.data)
                            navigate('/dashboard')
                            setLoading(false)
                        })
                        .catch((err) => {
                            alert(err.response.data.message)
                            setLoading(false)
                        })
                    }}>Initate Transfer</button>
                </div>
                <div className="text-center">
                    {loading && <Loader/>}
                </div>
            </div>
        </div>
    )
}   