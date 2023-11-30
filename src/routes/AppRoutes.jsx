import React from 'react'
import Signup from '../components/Signup'
import SignIn from '../components/SignIn'
import Create from '../components/Create'
import Dashboard from '../components/Dashboard'
import { Route, Navigate, Routes } from 'react-router-dom'
import Blog from '../components/Blog'
import Home from '../components/Home'
import Header from '../components/Header'


function AppRoutes() {
  return <>
    <Routes>
      <Route path='/create' element={<><Header/><Create/></>} />
      <Route path='/dashboard' element={<><Header/><Dashboard /></>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<><Header/><Home /></>} />
      <Route path='/blog/:id' element={<><Header/><Blog/></>} />
      <Route path='/' element={<SignIn />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  </>
}

export default AppRoutes