import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const {logout} = useAuth();
    
    const handleLogout = ()=>{
      const confirm = window.confirm("Are you sure You want to logout ?")
      if(confirm){
      logout();
      navigate("/login")
      }
    }


    return (
    <Navbar className="bg-body-tertiary mb-2 relative">
      <Container fluid>
        {/* Brand title aligned to the left */}
        <Navbar.Brand className="font-serif px-10">Task Manager</Navbar.Brand>

        {/* Links and form pushed to the right using ms-auto */}

        <Nav className="ms-auto align-items-center flex gap-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dashboard">dashboard</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
       <button onClick={handleLogout}>Logout</button>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default Header
