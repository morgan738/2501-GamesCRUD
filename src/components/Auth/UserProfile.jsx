import { Link } from "react-router-dom"
import axios from "axios"

const UserProfile = ({user, favorites, setFavorites}) => {

    const removeFavorite = async (favId) => {
        try {
            await axios.delete(`https://the-store-3j8t.onrender.com/api/favorites/${favId}`, {
                headers:{
                    "Authorization": `${window.localStorage.getItem('token')}`
                }
            })
            setFavorites(favorites.filter((fav) => fav.fav_id !== favId))
            console.log(favorites)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>{user.username}'s Profile</h1>
            <div>
                <h3>Info</h3>
                <p>User id: {user.id}</p>
                <p>Username: {user.username}</p>
            </div>
            <hr/>
            <h2>Favorited Games:</h2>
            {
                favorites.length > 0 ? (
                    <div className="gamesContainer">
            {
                favorites.map((favorite) => {
                    return (
                                    <div key={favorite.id} className="game">
                                        <Link to={`/games/${favorite.id}`}>
                                            <h3>{favorite.name}</h3>
                                        </Link>
                                        
                                        <p>Price: ${favorite.price/100}</p>
                                        <img src={favorite.image ? favorite.image : null}  alt={favorite.name}/>
                                        <div>
                                            <button onClick={() => removeFavorite(favorite.fav_id)}>Remove Favorites</button>
                                        </div>
                                    </div>
                                )

                        }) 
                    }
                    
                    </div>

                ) : (
                    <h3>No Favorites. Go add some!</h3>
                )
            }
            
            <hr/>
            <Link to='/games'>Back to All Games</Link>
        </div>
    )
}

export default UserProfile