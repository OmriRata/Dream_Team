import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar';
import { Route, Routes,useLocation } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import LeagueBuilder from './Pages/LeagueBuilder'

function App() {
  const [className, setClassName] = useState("body-home container");
  const location = useLocation();

  const setBackground = ()=>{
    switch(location.pathname){
      case '/':
          setClassName("body-home container")
          break
      case '/login':
          setClassName("body-login container")
          break
      case '/register':
          setClassName("body-register container")
          break
    }
  }
  useEffect(() => {
    setBackground();
  }, [location])

  return (
    <div className="App">
        <Navbar />
        <div className={className}>
          <Routes>
              <Route path="/" element={< Home/> }/>
              <Route path="/login" element={< Login/> }/>
              <Route path="/register" element={< Register />}/>
              <Route path="/createLeague" element={< LeagueBuilder />}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
