import axios from "axios"

const LoginForm = ({authenticate}) => {

    const login = async (formData) => {
        const username = formData.get("username")
        const password = formData.get("password")
        const user = {
            username,
            password
        }
        try {
            const {data} = await axios.post("https://the-store-3j8t.onrender.com/api/login", user)
            console.log(data)
            window.localStorage.setItem("token", data.token)
            authenticate(window.localStorage.getItem("token"))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form action={login}>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="password" name="password"/>
            </label>
            <button>Login</button>

        </form>
    )
}

export default LoginForm