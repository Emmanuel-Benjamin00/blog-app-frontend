import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/ApiService'
import useLogOut from '../hooks/useLogOut'
import BlogTile from './common/BlogTile'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function AllPosts() {
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
            <div className='fw-bold fs-1 mt-5' style={{textAlign:"center" , textDecoration: "underline"}}>
                All Posts
            </div>
            <div className='blogs-wrapper d-flex flex-column align-items-center mt-5'>
                {
                    blogs.map((e) => {
                        return <BlogTile blog={e} key={e._id} />
                    })
                }
                <Button className='my-4' style={{position:"relative", right:"0%", borderRadius:"0", padding:"10px 15px"}} onClick={()=>navigate("/home")}>Home</Button>
            </div>
        </div>
    </>
}

export default AllPosts