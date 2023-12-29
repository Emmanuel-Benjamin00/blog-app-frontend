import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BlogTileCreate({ blog }) {
  return <>
    
      <Card style={{ width: '30rem' }}>
        <div className='cardImg-cont' style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card.Img variant="top" src={blog.imageUrl} style={{ height: "100%", width: "auto" }} />
        </div>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            {blog.description}
          </Card.Text>
        </Card.Body>
      </Card>
 
  </>
}

export default BlogTileCreate