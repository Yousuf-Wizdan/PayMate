import Navbar from "../components/Navbar"
import Users from "../components/Users"

function Dashboard(){

    return(
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Users />
            </div>
        </div>
    )
}

export default Dashboard