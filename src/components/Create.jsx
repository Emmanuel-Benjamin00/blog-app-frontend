import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BlogTile from './common/BlogTile';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import useLogOut from '../hooks/useLogOut';
import { toast } from 'react-toastify';
import HeaderDashboard from './headers/HeaderDashboard';
import BlogTileCreate from './common/BlogTileCreate'


function Create() {
  let [title, setTitle] = useState("")
  let [imageUrl, setImage] = useState("")
  let [description, setDescription] = useState("")
  let navigate = useNavigate()
  let logout = useLogOut()
  const [isSubmitting, setIsSubmitting] = useState(false);

  let createBlog = async () => {
    try {
      setIsSubmitting(true);
      let res = await AxiosService.post('/blogs/create', { title, imageUrl, description })
      if (res.status === 201) {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    }
    catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
    finally {
      setIsSubmitting(false);
    }
  }
  return <div>
    <div>
      <HeaderDashboard />
      <h3 className='mt-3' style={{ textAlign: "center" }}>Share your Thoughts</h3>
      <Form className='container'>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="email" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" placeholder="Image Url" onChange={(e) => setImage(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <div className='mt-5'>
          <h2 style={{ textAlign: "center" }}>Preview</h2>
          <div className='blogs-wrapper d-flex justify-content-center'>
            <BlogTileCreate blog={{ title, imageUrl, description }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={() => createBlog()} disabled={isSubmitting} className='my-4 mb-5'>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
}

export default Create