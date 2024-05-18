import React from 'react'
import { Row,Col,Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const CostumersMain = () => {

    const CurrentUser = useSelector((state)=>state?.rootReducer.CurrentLogedInUser)
  return (
    <div>
      <Row style={{marginTop:"50px"}}>
        <Col className='offset-md-5'>
        <h2 style={{fontFamily:"Fantasy",color:"navy"}}>Hello,{CurrentUser.firstName}</h2><br /><br />
        </Col>
      </Row>
      <br />
       <Container>
       <Nav as="div" style={{background:"azure"}} fill="true" variant="tabs" defaultActiveKey="2">
      <Nav.Item>
        <Nav.Link href="/costumer/Products">Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/costumer/Orders" >My Orders</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/costumer/Account">My Account</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login" >Log Out</Nav.Link>
      </Nav.Item>
    </Nav>
<div style={{marginTop:"15px"}}>
<Outlet />
</div>
     
       </Container>       
    </div>
  )
}

export default CostumersMain
