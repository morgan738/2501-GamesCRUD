import AllGames from "./components/Games/AllGames"
import { useEffect, useState } from "react"
import axios from "axios"
import {Routes, Route} from 'react-router-dom'
import SingleGame from "./components/Games/SingleGame"
import NewGameForm from "./components/Games/NewGameForm"
import Search from "./components/Games/Search"

function App() {
  const [allGames, setAllGames] = useState([])
  const [searchResults, setSearchResults] = useState([])

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

 

  return (
    <div>
      <h1>Welcome to the game shop!</h1>
     

      <Routes>
        <Route path="/" element={<AllGames allGames={allGames} setAllGames={setAllGames} setSearchResults={setSearchResults} searchResults={searchResults}/>}/>
        <Route path="/games" element={<AllGames allGames={allGames} setAllGames={setAllGames} setSearchResults={setSearchResults} searchResults={searchResults}/>}/>
        <Route path="/games/:id" element={<SingleGame allGames={allGames} setAllGames={setAllGames}/>}/>
        <Route path="/games/addNew" element={<NewGameForm setAllGames={setAllGames} allGames={allGames}/>}/>
        <Route path="/games/search/?" element={<Search allGames={allGames}/>}/>
      </Routes>
    </div>
  )
}

export default App
