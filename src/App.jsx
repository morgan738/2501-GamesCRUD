import AllGames from "./components/Games/AllGames"
import { useEffect, useState } from "react"
import axios from "axios"
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import SingleGame from "./components/Games/SingleGame"
import NewGameForm from "./components/Games/NewGameForm"
import Search from "./components/Games/Search"
import LoginForm from "./components/Auth/LoginForm"
import Welcome from "./components/Auth/Welcome"
import SignUp from "./components/Auth/SignUp"
import UserProfile from "./components/Auth/UserProfile"

function App() {
  const [allGames, setAllGames] = useState([])
  const [user, setUser] = useState({})
  const [favorites, setFavorites] = useState([])
  const location = useLocation()
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const {data} = await axios.get("https://the-store-3j8t.onrender.com/api/games")
        console.log(data)
        setAllGames(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchGames()
    
  }, [])

  const authenticate = async (token) => {
    try {
      if(!token){
        throw Error("No token found")
      }
      const response = await axios.get("https://the-store-3j8t.onrender.com/api/me", {
        headers:{
          "Authorization": `${window.localStorage.getItem('token')}`
        }
      })
      console.log(response)
      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loggedInToken = window.localStorage.getItem("token")
    if(loggedInToken){
      authenticate(loggedInToken)
    }
  }, [user.id])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const {data} = await axios.get("https://the-store-3j8t.onrender.com/api/favorites", {
          headers: {
            "Authorization": `${window.localStorage.getItem('token')}`
          }
        })
        console.log("favorites", data)
        setFavorites(data)
      } catch (error) {
        console.error(error)
      }
    }
    const loggedInToken = window.localStorage.getItem("token")
    if(loggedInToken)
    {
      fetchFavorites()
    }
    
  },[user.id])

 

  return (
    <div>
      {
        location.pathname === "/signup" ? (
          null
        ) : (
          <div>
            {
              user.id ? <Welcome user={user} setUser={setUser}/> :
              <div>
                <h1>Please log in!</h1>
                <LoginForm authenticate={authenticate}/>
                <Link to='/signup'><h3>Or Sign up!</h3></Link>
                
              </div>
            }
             <hr/>
          </div>
        )
      }
      
     

      <Routes>
        <Route path="/" element={<AllGames allGames={allGames} setAllGames={setAllGames} user={user} favorites={favorites} setFavorites={setFavorites}/>}/>
        <Route path="/games" element={<AllGames allGames={allGames} setAllGames={setAllGames} user={user} favorites={favorites} setFavorites={setFavorites}/>}/>
        <Route path="/games/:id" element={<SingleGame allGames={allGames} setAllGames={setAllGames} user={user}/>}/>
        <Route path="/games/addNew" element={<NewGameForm setAllGames={setAllGames} allGames={allGames}/>}/>
        <Route path="/games/search/?" element={<Search allGames={allGames}/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about/:id" element={<UserProfile user={user} favorites={favorites} setFavorites={setFavorites}/>} />
      </Routes>
    </div>
  )
}

export default App
