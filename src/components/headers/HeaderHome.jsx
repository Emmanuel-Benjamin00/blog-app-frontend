import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogOut from '../../hooks/useLogOut';
import { Button } from 'react-bootstrap';

function HeaderHome(props) {
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

  const handleBlogClick = () =>{
    if(role==="admin"){
      navigate("/dashboard")
    }
    else{
      navigate("/home")
    }
  }
  
  return (
    <Navbar expand="lg" className="d-flex flex-column p-0">
      <Container className='pt-2' style={{position:"absolute",zIndex:"2"}}>
        <Navbar.Brand><h1 className='bordered-text fs-2'  onClick={() => handleBlogClick()} style={{cursor:"pointer"}}>Blog</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  className='bordered-text' id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items">
            {
              role === "admin" ? <AdminNavLinks /> : <UserNavLinks />
            }
          </Nav>
          <Nav>
            <Nav.Item><h4>{`${userData.firstName}`}</h4></Nav.Item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Item onClick={() => logout()}><Button variant='danger'>LogOut</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
       
      <img src="https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" style={{width:"100%", height:"95vh"}} />
      <div className="bordered-text-header d-flex flex-column justify-content-center align-items-center" style={{position:"absolute", top:"34%" }}>
        <h1 style={{fontSize:"6em", maxWidth:"50vw", fontWeight:"540"}}><b>Clear Blog</b></h1><br />
        <h4 className="bordered-text-header" style={{fontFamily:"arial", fontSize:"2.2em"}}>Blogging is cool</h4>
      </div>
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

export default HeaderHome;