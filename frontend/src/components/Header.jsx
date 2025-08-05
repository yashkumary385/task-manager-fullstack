import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout  , user} = useAuth();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure You want to logout ?")
    if (confirm) {
      logout();
      navigate("/login")
    }
  }


  return (
    <Navbar className="bg-body-tertiary mb-2 relative">
      <Container fluid>
        <Navbar.Brand className="font-serif px-10">Task Manager</Navbar.Brand>
       {   user ? ( <>

          <Nav className="ms-auto align-items-center flex gap-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          <button onClick={handleLogout}>Logout</button>
        </Nav>
      </> ) :
      ( <>
      <Nav className="ms-auto align-items-center flex gap-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/signup">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        </>
      )
}

      </Container>
    </Navbar>
  );
}

export default Header
