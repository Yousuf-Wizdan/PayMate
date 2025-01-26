import axios from "axios"
import { useEffect , useState} from "react"
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";


interface balanceProps{
    balance: number
}
function Users(){
    const [loading , setLoading] = useState(false)
    const [filter , setFilter] = useState('');
    let [users , setUsers]  = useState([])
    const [balance , setBalance] = useState<balanceProps | null>(null)
    console.log(users)
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/account/balance` , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            setBalance(response.data)
            setLoading(false)
        })
    },[])
    return(
        <div className="p-5">
            <div>
                <div className="text-2xl font-bold">
                    Your Balance : ${balance && balance.balance}
                </div>
            </div> 
            <div>
                <SearchUsers setUsers={setUsers} filter={filter} setFilter={setFilter}/>
            </div>
            <div className="mt-10">         
                {users.map(user => <SendMoneyComp user={user} />)}
            </div>
            {loading && <Loader />}
        </div>

    )
}

export default Users

interface searchUserprops{
    filter: string,
    setFilter: any,
    setUsers: any
}
const SearchUsers = ({filter , setFilter , setUsers}: searchUserprops) => {
    const [loading , setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_APP_BASE_BACKEND}/api/v1/user/bulk?filter=` + filter)
        .then((response) => {
            console.log(response.data)
            setUsers(response.data.user)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    } , [filter])

    return(
        <div className="mt-10">
           <div className="text-2xl font-bold"> 
                Users
           </div>
           <div className="border rounded-lg mt-3">
                <input onChange={(e) => setFilter(e.target.value)} className="p-3 w-full outline-none" type="text" placeholder="Search Users....." />
           </div>     
           {loading && <Loader />}    
        </div>
    )
}

interface sendMoneyProps{
    user: any
}

function SendMoneyComp({user}: sendMoneyProps){
    const navigate = useNavigate()
    return(
        <div className="flex items-center justify-between m-5">
            <div className="flex items-center gap-3">
                <div className="bg-gray-300 rounded-full p-2 w-10 h-10 text-center">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div className="text-2xl font-bold">
                    {user.firstName}
                </div>
            </div> 
            <div className="bg-black font-bold text-white rounded-md">
                <button className="cursor-pointer p-3" onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                }}>Send Money</button>
            </div>
        </div>
    )
}
