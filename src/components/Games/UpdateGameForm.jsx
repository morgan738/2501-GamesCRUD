import axios from "axios"


const UpdateGameForm = ({game, setAllGames, allGames}) => {

    const updateGame = async (formData) => {
        try {
            const updatedGame = {
                name: formData.get("name"),
                description: formData.get("description"),
                price: formData.get("price"),
                image: formData.get("image"),
                rating: formData.get("rating"),
            }
            const {data} = await axios.put(`https://the-store-3j8t.onrender.com/api/games/${game.id}`, updatedGame)
            console.log(data)

            const updateList = allGames.map((game) => {
                return game.id === data.id ? data : game
            })
            setAllGames(updateList)
        } catch (error) {
            console.error(error)
        }
        
    }
    

    return (
        <div>
            <h4>Edit game</h4>
            <form action={updateGame}>
                <label>
                    Name: <input type="text" name="name" defaultValue={game.name}/>
                </label>
                <br/>
                <label>
                    Description: <input type="textbox" name="description" defaultValue={game.description}/>
                </label>
                <br/>
                <label>
                    Price: <input type="number" name="price" defaultValue={game.price}/>
                </label>
                <br/>
                <label>
                    Image: <input type="text" name="image" defaultValue={game.image}/>
                </label>
                <br/>
                <label>
                    Rating: <input type="number" min="1" max="5" name="rating" defaultValue={game.rating}/>
                </label>
                <br/>
                <button>Submit</button>
            </form>

        </div>
    )
}

export default UpdateGameForm