import React from 'react'
import Signup from '../components/Signup'
import SignIn from '../components/SignIn'
import Create from '../components/Create'
import Dashboard from '../components/Dashboard'
import { Route, Navigate, Routes } from 'react-router-dom'
import Blog from '../components/Blog'
import Home from '../components/Home'
import Header from '../components/headers/Header'
import ForgetPassword from '../components/ForgetPassword'
import ResetPassword from '../components/ResetPassword'
import Footer from '../components/footer'
import BlogPost from '../components/BlogPost'
import HeaderHome from '../components/headers/HeaderHome'
import AllPosts from '../components/AllPosts'

function AppRoutes() {
  return <>
    <Routes>
      <Route path='/create' element={<><Create/></>} />
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route path='/dashboard' element={<><Dashboard /></>} />
      <Route path='/reset-link' element={<ResetPassword/>}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<><HeaderHome/><Home /><Footer/></>} />
      <Route path='/allposts' element={<><AllPosts /><Footer/></>} />
      <Route path='/post' element={<><BlogPost/><Footer/></>} />
      <Route path='/blog/:id' element={<><Blog/></>} />
      <Route path='/' element={<SignIn />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  </>
}

export default AppRoutes