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
                        <UpdateGameForm game={game} setAllGames={setAllGames} allGames={allGames}/>
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <p>{game.price}</p>
                        <img src={game.image ? game.image : null} alt={game.name}/>
                        <p>Rating: {game.rating} / 5</p>
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