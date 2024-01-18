import './App.css'
import Index from './templates/Index/Index'
import Login from './templates/auth/Login'
import Register from './templates/auth/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/ingreso' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
