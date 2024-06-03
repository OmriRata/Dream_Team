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
  const [className, setClassName] = useState("body-home container");
  const [page, setPage] = useState("home");
  const location = useLocation();

  const setBackground = ()=>{
    switch(location.pathname){
      case '/':
          setClassName("body-home container")
          setPage("home")
          break
      case '/login':
          setClassName("body-login container")
          setPage("login")
          break
      case '/register':
          setPage("register")
          setClassName("body-register container")
          break
    }
  }
  useEffect(() => {
    setBackground();
  }, [location])

  return (
    <div className="App">
        <Navbar page={page}/>
        <div className={className}>
          <Routes>
              <Route path="/" element={< Home c={setPage}/> }/>
              <Route path="/login" element={< Login/> }/>
              <Route path="/register" element={< Register />}/>
              <Route path="/createLeague" element={< LeagueBuilder />}/>
              <Route path="/createTeam" element={< TeamBuilder />}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
