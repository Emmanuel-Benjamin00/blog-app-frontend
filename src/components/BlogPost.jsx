import React from 'react'
import Header from './headers/Header'
import { useLocation } from 'react-router-dom'


function BlogPost() {

  const location = useLocation();
  const receivedData = location.state?.selectedBlog || null;

  return <>
    <Header data={receivedData} />
    <>
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <div style={{ width: "50%" }}>
          <p>{receivedData.description}</p>
        </div>
      </div>

    </>
  </>
}

export default BlogPost