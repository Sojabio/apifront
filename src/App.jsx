import './App.css'
import Navbar from './components/NavBar'
import Articles from './components/Articles'
import Register from './components/Register'
import Signin from './components/Signin'
import NewPassword from './components/NewPassword'

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterSuccess from './pages/RegisterSuccess'
import ModifyPasswordSuccess from './pages/ModifyPasswordSuccess'

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Articles/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/registersuccess" element={<RegisterSuccess/>} />
          <Route path="/users/password/edit" element={<NewPassword/>}/>
          <Route path="/modifysuccess" element={<ModifyPasswordSuccess/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
