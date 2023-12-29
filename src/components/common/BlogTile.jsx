import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../styles/blogTile.css"
import { useNavigate } from 'react-router-dom';


function BlogTile({ blog }) {

  let navigate = useNavigate()

  const date = new Date(blog.createdAt);
  return <>
    <Row xs={1} md={1} className="g-4 each-blog-style">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col key={idx}>
          <Card className='border-0'>
            {/* <div className='cardImg-cont' style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Card.Img variant="top" src={blog.imageUrl} style={{ height: "100%", width: "auto" }} />
            </div> */}
            <Card.Body>
              <div className="hover-effect" onClick={() => navigate("/post", { state: { selectedBlog: blog } })}>
                <Card.Title style={{fontWeight:"750", fontSize:"3.5em"}}>{blog.title}</Card.Title>
                <Card.Text className='text-truncate'>{blog.description}</Card.Text>
              </div>
              <br/>
              <Card.Text>Posted by {blog.nameofCreartedUser} on {date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Card.Text>
            </Card.Body>
          </Card>
          <hr />
        </Col>
      ))}
    </Row>

  </>
}

export default BlogTile