import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Navbar className="navbar-fixed-top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/">Home</Nav.Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {localStorage.getItem("token") === null ? (
              <>
                <Nav.Link href="/Register">Register</Nav.Link>
                <Nav.Link href="/login">login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/addOrder">Order</Nav.Link>
                <Button onClick={logout}>Logout</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
