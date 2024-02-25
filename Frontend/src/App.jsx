import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={< Home/> }/>
            <Route path="/login" element={< Login/> }/>
            <Route path="/register" element={< Register />}/>
        </Routes>
    </div>
  )
}

export default App
