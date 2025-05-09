import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './Home.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact'
import NuevaFloreria from './pages/NuevaFloreria'
import Fotos from './pages/Fotos'

function App() {
  return (
    <> {/* fragment */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contacto" element={<Contact/>}/>
          <Route path="/nueva-floreria" element={<NuevaFloreria/>}/>
          <Route path="/subir-fotos" element={<Fotos/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}




export default App
