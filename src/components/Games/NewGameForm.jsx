import axios from "axios"
import { Link } from "react-router-dom"

const NewGameForm = ({setAllGames, allGames}) => {

    const addGame = async (formData) => {
        try {
            const newGame = {
                name: formData.get("name"),
                description: formData.get("description"),
                price: formData.get("price"),
                image: formData.get("image"),
                rating: formData.get("rating"),
            }
            const {data} = await axios.post("https://the-store-3j8t.onrender.com/api/games", newGame)
            console.log(data)
            //[...allGames, data] --> [allGames[0], allGames[1], allGames[2], allGames[3], data]
            setAllGames([...allGames, data])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form action={addGame}>
                <label>
                    Name: <input type="text" name="name"/>
                </label>
                <br/>
                <label>
                    Description: <input type="textbox" name="description" />
                </label>
                <br/>
                <label>
                    Price: <input type="number" name="price"/>
                </label>
                <br/>
                <label>
                    Image: <input type="text" name="image"/>
                </label>
                <br/>
                <label>
                    Rating: <input type="number" min="1" max="5" name="rating"/>
                </label>
                <br/>
                <button>Submit</button>
            </form>

            <Link to='/games'> Back to all Games</Link>
        </div>
    )
}

export default NewGameForm