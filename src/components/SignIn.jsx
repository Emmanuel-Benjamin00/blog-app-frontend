import React, { useState } from 'react'
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify'
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import "../styles/signin.css"
import Header from './headers/Header';

function SignIn() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);

  let handleLogin = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true);
      let res = await AxiosService.post('/user/login', {
        email,
        password
      })
      if (res.status === 200) {
        toast.success(res.data.message)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('userData', JSON.stringify(res.data.userData))

        if (res.data.userData.role === 'admin') {
          navigate('/dashboard')
        }
        else {
          navigate('/home')
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setIsSubmitting(false);
    }
  }
  return <>
    <div className='login-section'>
      
      <Container className='login-form-cont'>
        <div className='d-flex  justify-content-center align-items-center'>
          <div  className='login-form d-flex flex-column align-items-center'>
            <h1>Login</h1>
            <Form className='login-act-form'>
              <FormGroup className="mb-3">
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={((e) => setEmail(e.target.value))} />
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" id="exampleInputPassword1" onChange={((e) => setPassword(e.target.value))} />
              </FormGroup>
              <div id='error' className='text-danger fw-bold '></div>
              <Button variant="primary" className='button-login' type='submit' onClick={(e) => handleLogin(e)}  disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
            <div className='pointer' onClick={() => navigate("/forgetpassword")}>Forgot Password</div>
            <div className='mt-4 text-primary fs-5 pointer' onClick={() => navigate("/signup")}>New User? SignUp</div>
          </div>
        </div>
      </Container>
    </div>
  </>
}

export default SignIn