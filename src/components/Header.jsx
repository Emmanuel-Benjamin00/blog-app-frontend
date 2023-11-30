import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogOut from '../hooks/useLogOut';
import { Button } from 'react-bootstrap';

function Header() {
  let userData = JSON.parse(sessionStorage.getItem('userData'))
  let [role, setRole] = useState("")
  let navigate = useNavigate()
  let logout = useLogOut()

  useEffect(() => {
    if (!userData) {
      logout()
    }
    else {
      setRole(userData.role)
    }
  }, [])
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><h3>Blog App</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items">
            {
              role === "admin" ? <AdminNavLinks /> : <UserNavLinks />
            }
          </Nav>
          <Nav>
            <Nav.Item><h4>{`${userData.firstName} ${userData.lastName}`}</h4></Nav.Item>
            &nbsp;
            <Nav.Item onClick={() => logout()}><Button variant='danger'>LogOut</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function AdminNavLinks() {
  let navigate = useNavigate()
  return <>
    <Nav.Item onClick={() => navigate('/dashboard')}>Dashboard</Nav.Item>
  </>
}


function UserNavLinks() {
  let navigate = useNavigate()
  return <>
    <Nav.Item onClick={() => navigate('/home')}>Home</Nav.Item>
    <Nav.Item onClick={() => navigate('/dashboard')}>Dashboard</Nav.Item>
    <Nav.Item onClick={() => navigate('/create')}>Create</Nav.Item>
  </>
}

export default Header;