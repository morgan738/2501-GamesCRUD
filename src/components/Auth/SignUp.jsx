import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
    const navigate = useNavigate()

    const register = async (formData) => {
        const username = formData.get("username")
        const password = formData.get("password")
        const user = {
            username,
            password
        }
        try {
            const {data} = await axios.post('https://the-store-3j8t.onrender.com/api/users', user)
            console.log(data)
            alert("Thanks for signing up!")
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Welcome! Sign up for cool stuffz</h1>
            <form action={register}>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password"/>
                </label>
                <button>Register</button>
            </form>
            <Link to='/'>Return home</Link>

        </div>
    )
}

export default SignUp