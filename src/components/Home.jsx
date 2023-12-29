import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/ApiService'
import useLogOut from '../hooks/useLogOut'
import BlogTile from './common/BlogTile'
import Header from './headers/Header'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Home() {
  let [blogs, setBlogs] = useState([])
  let logout = useLogOut()
  let navigate = useNavigate()
  let getBlogs = async () => {
    try {
      let res = await AxiosService.get('/dashboard')
      if (res.status === 200) {
        setBlogs(res.data.blogs)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout()
      }
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return <>
  <div className='container-fluid' style={{}}>
    <div className='blogs-wrapper d-flex flex-column align-items-center mt-5'>
      {
        blogs.map((e) => {
          return <BlogTile blog={e} key={e._id} />
        }).slice(0,5)
      }
      <Button className='my-4' style={{position:"relative", right:"0%", borderRadius:"0", padding:"10px 15px"}} onClick={()=>navigate("/allposts")}>Older Posts</Button>
    </div>
   
  </div>
  </>
}

export default Home