import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { toast } from "react-toastify";

const PublicLinks = () => {
  return (
    <>
      <Link href="/login" passHref legacyBehavior>
        <Nav.Link>Login</Nav.Link>
      </Link>
      <Link href="/register" passHref legacyBehavior>
        <Nav.Link>Register</Nav.Link>
      </Link>
    </>
  );
};

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Blockchain project</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <PublicLinks />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
