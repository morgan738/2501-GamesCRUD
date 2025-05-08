import "./games.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const AllGames = ({allGames, setAllGames, setSearchResults, searchResults}) => {
    const navigate = useNavigate()

    const deleteGame = async (id) => {
        try {
            await axios.delete(`https://the-store-3j8t.onrender.com/api/games/${id}`)
            const newGames = allGames.filter((game) => {
                return game.id !== id
            })
            setAllGames(newGames)
        } catch (error) {
            console.error(error)
        }
    }

    const searchForGames = (formData) => {
        const target = formData.get("searchBar").toLowerCase()
        navigate(`/games/search/?game=${target}`)

        
    }

    return (
        <div>
            <h2>Check out all our games or <Link to='/games/addNew'>Add a new one</Link>!</h2>
            <h3>Search for a game by name here: </h3>
            <form action={searchForGames}>
                <input type="text" name="searchBar" />
                <button>Search</button>
            </form>
            
            <div className="gamesContainer">
                {
                        allGames.map((game) => {
                            return (
                                <div key={game.id} className="game">
                                    <Link to={`/games/${game.id}`}>
                                        <h3>{game.name}</h3>
                                    </Link>
                                    
                                    <p>Price: ${game.price/100}</p>
                                    <img src={game.image ? game.image : null}  alt={game.name}/>
                                    <br/>
                                    <button onClick={() => deleteGame(game.id)}>Remove</button>
                                </div>
                            )
                        })

                    
                    
                }
            </div>
        </div>
    )
}

export default AllGames