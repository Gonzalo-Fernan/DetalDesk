import './App.css'
import NavBar from './components/Navbar'
import Agenda from "./components/Agenda"
import Pacientes from './components/Pacientes'
import LoginRegister from './components/Login-Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path='/' element={<LoginRegister />} />
            <Route path='/agenda' element={<Agenda/>} /> 
            <Route path='/pacientes' element={<Pacientes/>} /> 
            {/* <Route path='/Merceria-react/iniciar-sesion' element={<LoginRegister />} />
            <Route path='/Merceria-react/catalogo' element={<ProductList />} />
            <Route path='/Merceria-react/catalogo/:itemId' element={<ProductDetailConteiner />} />
            <Route path='/Merceria-react/:categoria' element={<Maquinas />} />
            <Route path='/Merceria-react/checkout' element={<Checkout/>} /> 
           
            <Route path='*' element={<Navigate to={'/'} />} /> */}
          </Routes>
      
        

      
      </BrowserRouter>
    </>
  )
}

export default App
