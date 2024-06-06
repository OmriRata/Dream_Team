import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar';
import { Route, Routes,useLocation } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import LeagueBuilder from './Pages/LeagueBuilder'
import '@radix-ui/themes/styles.css';
import TeamBuilder from './Pages/TeamBuilder';

function App() {
  const [page, setPage] = useState("home");
  

  return (
    <div className="App">
        <Navbar page={page}/>
          <Routes>
              <Route path="/" element={< Home c={setPage}/> }/>
              <Route path="/login" element={< Login/> }/>
              <Route path="/register" element={< Register />}/>
              <Route path="/createLeague" element={< LeagueBuilder />}/>
              <Route path="/createTeam" element={< TeamBuilder />}/>
          </Routes>
    </div>
  )
}

export default App
