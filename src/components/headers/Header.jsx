import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogOut from '../../hooks/useLogOut';
import { Button } from 'react-bootstrap';
import "../../styles/header.css"

function Header(props) {
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
  const date = new Date(props.data.createdAt);
  return (
    
    <Navbar expand="lg" className="d-flex flex-column p-0">
      <Container className='pt-2 bordered-text-header' style={{position:"absolute",zIndex:"2"}}>
        <Navbar.Brand><h3 className='bordered-text fs-2' onClick={() => handleBlogClick()} style={{cursor:"pointer"}}>Blog</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='bordered-text' id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items">
            {
              role === "admin" ? <AdminNavLinks /> : <UserNavLinks />
            }
          </Nav>
          <Nav>
            <Nav.Item><h4>{`${userData.firstName}`}</h4></Nav.Item>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Nav.Item onClick={() => logout()}><Button variant='danger'>LogOut</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <img src={props.data.imageUrl} alt="" className='blurImg' style={{width:"100%", height:"95vh",  filter: "blur(4px)"}} />
      <img src={props.data.imageUrl} alt="" className='imageOfPost' style={{width:"auto", minWidth:"25%", height:"95vh", position:"absolute"}}/>
      <div className="bordered-text-header" style={{position:"absolute", bottom:"10%" }}>
        <h1 style={{fontSize:"4em", maxWidth:"50vw"}}>{props.data.title}</h1>
        <h4 className="bordered-text-header" style={{fontFamily:"Georgia"}}>Posted by {props.data.nameofCreartedUser} on {date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
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

export default Header;