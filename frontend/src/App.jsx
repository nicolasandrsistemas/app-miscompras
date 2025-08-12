import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Inicio from './components/Inicio'
import Acomprar from './components/Acomprar'
import Historico from './components/Historico'
import supermercadoBanner from './assets/baneer12.jpg'
import Productos from './components/Productos'
import Producto from './components/Producto'

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">SuperMarket</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarText" />
          <Navbar.Collapse id="navbarText">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={NavLink} to="/inicio">Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/acomprar">A comprar</Nav.Link>
              <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/historico">Historico</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="text-center">
        <img
          src={supermercadoBanner}
          alt="Banner supermercado"
          className="img-fluid"
          style={{
            height: "220px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "0% 67%"
          }}
        />
      </div>

      <div>
        <div className="row">
          <div>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/acomprar" element={<Acomprar />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<Producto />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App