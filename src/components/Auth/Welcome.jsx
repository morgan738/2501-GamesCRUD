import { Link, useNavigate } from "react-router-dom"

const Welcome = ({user, setUser}) => {
    const navigate = useNavigate()
    
    const logOut = () => {
        window.localStorage.removeItem("token")
        setUser({})
        navigate('/')
    }

    return (
        <div>
            <h1>Welcome back {user.username}</h1>
            <div>
                <Link to={`/about/${user.id}`}>View Profile</Link>
            </div>
            <button onClick={() => logOut()}>LogOut</button>
        </div>
    )
}

export default Welcome