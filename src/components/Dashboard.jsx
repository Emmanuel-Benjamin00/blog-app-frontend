import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import useLogOut from '../hooks/useLogOut';
import { toast } from 'react-toastify'
import HeaderDashboard from './headers/HeaderDashboard';

function Dashboard() {
  let userData = JSON.parse(sessionStorage.getItem('userData'))
  let [blogs, setBlogs] = useState([])
  let navigate = useNavigate()
  let logout = useLogOut()

  let getBlogs = async () => {
    try {
      let url = userData.role === 'admin' ? '/blogs' : '/blogs/user'
      let res = await AxiosService.get(url)
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
    <HeaderDashboard />
    <div className='container mt-4 table-responsive'>
      <Table hover className='table'>
        {
          userData.role === "admin" ?
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead> :
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead>
        }
        <tbody>
          {
            blogs.map((e, i) => {
              const date = new Date(e.createdAt);

              const formattedDateTime = date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return <tr key={e._id} onClick={() => navigate(`/blog/${e._id}`)} className='cursor-pointer'>
                {
                  userData.role === "admin" ?
                    <>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td style={{ textAlign: "center" }}>{e.title}</td>
                      <td style={{ textAlign: "center" }}><img src={e.imageUrl} className='table-image' style={{ height: "50px", width: "auto", maxWidth: "150px" }} /></td>
                      <td style={{ textAlign: "center" }}>{e.nameofCreartedUser}</td>
                      <td style={{ textAlign: "center" }}>{formattedDateTime}</td>
                      <td style={{ textAlign: "center" }}>{e.status}</td>
                    </>
                    :
                    <>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td style={{ textAlign: "center" }}>{e.title}</td>
                      <td style={{ textAlign: "center" }}><img src={e.imageUrl} className='table-image' style={{ height: "50px", width: "auto", maxWidth: "150px" }} /></td>
                      <td style={{ textAlign: "center" }}>{formattedDateTime}</td>
                      <td style={{ textAlign: "center" }}>{e.status}</td>
                    </>
                }

              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  </>
}

export default Dashboard