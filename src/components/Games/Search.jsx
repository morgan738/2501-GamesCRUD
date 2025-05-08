import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Search = ({allGames}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchResults, setSearchResults] = useState([])
    //setSearchParams({name: "hello"})
    const nameSearch = searchParams.get("game")
    const navigate = useNavigate()
    //console.log(nameSearch)

    useEffect(() => {
        const result = allGames.filter((game) => {
            return game.name.toLowerCase().includes(nameSearch)
        })
        console.log(result)
        setSearchResults(result)
    }, [allGames])
   
    const clearSearch = () => {
        setSearchResults([])
        navigate('/games')
    }


    return (
        <div className="gamesContainer">

                {
                        searchResults.map((game) => {
                            return (
                                <div key={game.id} className="game">
                                    <Link to={`/games/${game.id}`}>
                                        <h3>{game.name}</h3>
                                    </Link>
                                    
                                    <p>Price: ${game.price/100}</p>
                                    <img src={game.image ? game.image : null}  alt={game.name}/>
                                    <br/>
                                    {/* <button onClick={() => deleteGame(game.id)}>Remove</button> */}
                                </div>
                            )
                        })
                }
                <div>
                    <button onClick={() => clearSearch()}>Clear Search Results</button>
                </div>
                
            </div>
    )
}

export default Search