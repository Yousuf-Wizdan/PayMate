import axios from "axios"
import { useEffect, useState } from "react"
import { Loader } from "./Loader"
import { Link } from "react-router-dom"

interface dataProps{
    firstName: string,
    lastName: string,
    username: string
}

function Navbar(){
    let [data , setData] = useState<dataProps | null>(null)
    const [loading , setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/user`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            setData(response.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    } , [])
    return(
        <div className="h-20 flex justify-between items-center p-10 border-b border-gray-300">
            <Link to={'/'}>
                <div className="font-bold text-2xl">
                    PayMate
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <div className="text-bold text-xl">
                    Hello , {data && data.firstName}
                </div>   
                <div className="bg-gray-300 rounded-full p-2 w-10 h-10 text-center">
                    {data && data.firstName[0].toUpperCase()}
                </div>
            </div>
             
                {loading && <Loader />}
        </div>  
    )
}

export default Navbar