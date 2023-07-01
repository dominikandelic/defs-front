import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSubscription } from "react-stomp-hooks";
import { useState } from "react";

const PublicLinks = () => {
  return (
    <>
      <Link href="/upload_file" passHref legacyBehavior>
        <Nav.Link>Upload</Nav.Link>
      </Link>
      <Link href="/download_file" passHref legacyBehavior>
        <Nav.Link>Download</Nav.Link>
      </Link>
      <Link href="/blockchain" passHref legacyBehavior>
        <Nav.Link>Blockchain</Nav.Link>
      </Link>
    </>
  );
};

const Navigation = () => {
  const [activeSessionCount, setActiveSessionCount] = useState<number>();
  useSubscription("/topic/socket_number_notification", (message) => {
    console.log(message.body);
    setActiveSessionCount(message.body as unknown as number);
  });
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
        <span className="text-white">Active clients: {activeSessionCount}</span>
      </Container>
    </Navbar>
  );
};

export default Navigation;
