import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router';


const AdminMain = () => {
  return (
    <div>
      <br />
      <h2 style={{width:"50%",marginLeft:"800px"}}>Hello,Admin</h2><br /><br />

       <Container>
       <Nav fill variant="tabs" defaultActiveKey="/admin/catagories">
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
<div style={{background:"cadetblue",height:"600px"}}>
<Outlet />
</div>
     
       </Container>       
    </div>
  )
}

export default AdminMain
