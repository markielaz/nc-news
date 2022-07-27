import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/User"
import { getUsers } from "./utils/api"

export default function LoginPage() {

    const [users, setUsers] = useState([])
    const {setLoggedInUser} = useContext(UserContext)
    const navigate = useNavigate();

    const clickUser = (newUser) => {
        setLoggedInUser(newUser)
        navigate(`/`)
    }

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, [])

    return(
        <div className="user-container">
            <h2>Please select your username</h2>
            <div className="users">
            {users.map((user) => {
                return <figure className="user-card" key={user.username} onClick={() => clickUser(user)}>
                    <img className="user-avatar" src={user.avatar_url} alt={user.username}/>
                    <h5>{user.username}</h5>
                </figure>
            })}
            </div>
        </div>
    )
}