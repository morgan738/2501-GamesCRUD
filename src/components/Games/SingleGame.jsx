import { useParams, Link } from "react-router-dom"
import UpdateGameForm from "./UpdateGameForm"

const SingleGame = ({allGames, setAllGames}) => {
    /*
    const params = window.location.hash.slice(1)
    {
    id: '1'
    }
    */
    const params = useParams()
    const id = params.id*1
    //console.log(params)
    const game = allGames.find((game) => {
        return game.id === id
    })

    
    return (
        <div>
            {
                game ? (
                    <div>
                        <hr/>
                        <UpdateGameForm game={game} setAllGames={setAllGames} allGames={allGames}/>
                        <hr/>
                        <div className="game">
                            <h3>{game.name}</h3>
                            <p>Description: {game.description}</p>
                            <p>Price: ${game.price/100}</p>
                            <img src={game.image ? game.image : null} alt={game.name}/>
                            <p>Rating: {game.rating} / 5</p>
                        </div>
                    </div>
                ) : (
                    <h3>Loading...</h3>
                )
            }
            

            <Link to='/games'>Back to all games</Link>
        </div>
    )
}

export default SingleGame