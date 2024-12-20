import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router';


const AdminMain = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <br />
      <Row>
        <Col className='offset-md-5'>
          <h2 style={{ fontFamily: "Fantasy", color: "navy" }}>Hello,Admin</h2><br /><br />
        </Col>
      </Row>
      <Container>
        <Nav as="div" style={{ background: "Azure" }} fill="true" variant="tabs" defaultActiveKey="2">
          <Nav.Item>
            <Nav.Link href="/admin/Catagories">Catagories</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/admin/Products" >Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/admin/Customers">Customers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/admin/Statistics" >
              Statistics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login" >Log Out</Nav.Link>
          </Nav.Item>
        </Nav>
        <div style={{ marginTop: "15px" }}>
          <Outlet />
        </div>

      </Container>
    </div>
  )
}

export default AdminMain
