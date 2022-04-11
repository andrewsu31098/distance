import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "./Navvy.css";

function Navvy(props) {
  return (
    <Navbar bg="my-white" expand="lg" id="Navvy">
      <Container>
        <Navbar.Brand href="#home" id="Brand">
          DISTANCE <span id="second"> GUESSR</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">FEATURES</Nav.Link>
            <Nav.Link href="#link">GITHUB</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Button variant="outline-primary" id="Login">
          Login
        </Button>
        <Button id="Signup">Signup</Button> */}
      </Container>
    </Navbar>
  );
}

export default Navvy;
