import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/ApiService';
import "../styles/signup.css"

function Signup() {
  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setError] = useState("")
  let [role, setRole] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);


  let createUser = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true);
        let res = await AxiosService.post('/user/signup', {
            firstName,
            lastName,
            email,
            password,
            role
        })
        if (res.status === 201) {
            navigate("/")
        }
    }
    catch (error) {
        console.log(error.response)
        setError("User Already Exists")
    }
    finally {
      setIsSubmitting(false);
    }
}

useEffect(()=>{
  setRole('user'); 
},[])

let navigate = useNavigate()

  return <>
  <div className='signup-section'>
    <Container>
      <div className='d-flex flex-column justify-content-center align-items-center '>
        <h3>SignUp</h3>
        <Form className='signup-form'>
          <FormGroup className="mb-3">
            <FormLabel>First Name</FormLabel>
            <FormControl type="text" id="firstName" aria-describedby="firstName" onChange={(e) => setFirstName(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Last Name</FormLabel>
            <FormControl type="text" id="lastName" aria-describedby="lastName" onChange={(e) => setLastName(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Role</FormLabel>
            <FormControl type="text" id="role" value={role} disabled />
          </FormGroup>

          <div id="signup-error" className='text-danger'>{error}</div>
          <Button variant="primary" type="submit" className='button-login' onClick={(e) => createUser(e)} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
        <div className='mt-2 text-primary fs-6 pointer' onClick={() => navigate("/")}>Back to Login Page</div>
      </div>
    </Container>
    </div>
  </>
}

export default Signup