import React, { useEffect, useState } from 'react'
import BlogTile from './common/BlogTile'
import { useParams } from 'react-router-dom'
import useLogOut from '../hooks/useLogOut'
import { toast } from 'react-toastify'
import AxiosService from '../utils/ApiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import HeaderDashboard from './headers/HeaderDashboard'
import BlogTileCreate from '../components/common/BlogTileCreate'


function Blog() {
  let logout = useLogOut()
  let userData = JSON.parse(sessionStorage.getItem('userData'))


  return <>
    <div>
      {
        userData.role === 'admin' ? <AdminBlog /> : <EditBlog />
      }
    </div>
  </>
}


function EditBlog() {
  let logout = useLogOut()
  let params = useParams()
  let [title, setTitle] = useState("")
  let [imageUrl, setImage] = useState("")
  let [description, setDescription] = useState("")
  let [blog, setBlog] = useState("")
  let navigate = useNavigate()

  let getBlog = async () => {
    try {
      let res = await AxiosService.get(`/blogs/${params.id}`)
      if (res.status === 200) {
        setTitle(res.data.blog.title)
        setImage(res.data.blog.imageUrl)
        setDescription(res.data.blog.description)
        setBlog(res.data.blog)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
  }

  useEffect(() => {
    if (params.id) {
      getBlog()
    }
    else {
      logout()
    }
  }, [])

  let editblog = async () => {
    try {
      let res = await AxiosService.put(`/blogs/edit/${blog._id}`, {
        title, imageUrl, description
      })
      if (res.status === 200) {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
  }
  return <>
    <HeaderDashboard />
    <Form className='container mt-4'>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" value={imageUrl} placeholder="Image Url" onChange={(e) => setImage(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" value={description} placeholder="Description" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <div className='mt-5'>
        <h2 style={{ textAlign: "center" }}>Preview</h2>
        <div className='blogs-wrapper d-flex justify-content-center'>
          <BlogTileCreate blog={{ title, imageUrl, description }} />
        </div>
        <div style={{ textAlign: "center" }} className='my-3 mb-5'>
          <Button variant="primary" onClick={() => editblog()} >
            Submit
          </Button>
          &nbsp;
          <Button variant='warning' onClick={() => navigate('/dashboard')}>Cancel</Button>
        </div>
      </div>
    </Form>
  </>
}


function AdminBlog() {
  let params = useParams()
  let [blog, setBlog] = useState({})
  let navigate = useNavigate()

  let getBlog = async () => {
    try {
      let res = await AxiosService.get(`/blogs/${params.id}`)
      if (res.status === 200) {
        setBlog(res.data.blog)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
  }

  useEffect(() => {
    if (params.id) {
      getBlog()
    }
    else {
      logout()
    }
  }, [])

  let changeStatus = async (status) => {
    try {
      let res = await AxiosService.put(`/blogs/status/${blog._id}/${status}`)
      if (res.status === 200) {
        getBlog()
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
  }
  return <div className='d-flex flex-column justify-content-center align-items-center' style={{height: "100vh"}}>
    <div className='blogs-wrapper' >
      <BlogTileCreate blog={blog} />
    </div>
    <div style={{ textAlign: "center" }} >
      {
        blog.status !== 'pending' ? <Button variant='warning' onClick={() => changeStatus('pending')}>Pending</Button> : <></>
      }
      &nbsp;
      {
        blog.status !== 'approved' ? <Button variant='success' onClick={() => changeStatus('approved')}>Approve</Button> : <></>
      }
      &nbsp;
      {
        blog.status !== 'rejected' ? <Button variant='danger' onClick={() => changeStatus('rejected')}>Reject</Button> : <></>
      }
      <Button variant='primary' className='ms-2' onClick={() => navigate("/dashboard")}>Back</Button>
    </div>
  </div>
}

export default Blog