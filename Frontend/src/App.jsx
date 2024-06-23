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
import Leagues from './Pages/Leagues';
import Team from './Pages/Team';
import ExplanationPage from './Pages/ExplanationPage'

function App() {
  const [className, setClassName] = useState("body-home container");
  const [page, setPage] = useState("home");
  const location = useLocation();



  return (
    <div className="App">
        <Navbar page={page}/>
          <Routes>
              <Route path="/" element={< Home c={setPage}/> }/>
              <Route path="/login" element={< Login/> }/>
              <Route path="/register" element={< Register />}/>
              <Route path="/createLeague" element={< LeagueBuilder />}/>
              <Route path="/createTeam" element={< TeamBuilder />}/>
              <Route path="/leagues" element={< Leagues />}/>
              <Route path="/team" element={< Team />}/>
              <Route path="/ExplanationPage" element={< ExplanationPage />}/>
          </Routes>
    </div>
  )
}

export default App
