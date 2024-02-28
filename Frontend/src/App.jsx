import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar';
import { Route, Routes,useLocation } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  const [isLoginPage, setBackground] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setBackground(location.pathname == "/login" ? true : false);
  }, [location])

  return (
    <div className="App">
        <Navbar />
        <div className={isLoginPage? "body-login container":"body-home container"}>
          <Routes>
              <Route path="/" element={< Home/> }/>
              <Route path="/login" element={< Login/> }/>
              <Route path="/register" element={< Register />}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
