import React from 'react'
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const CostumersMain = () => {

    const CurrentUser = useSelector((state)=>state?.rootReducer.CurrentLogedInUser)
  return (
    <div>
         <h2 style={{width:"50%",marginLeft:"500px"}}>Hello , {CurrentUser.firstName}</h2>
      <br />
       <Container>
       <Nav fill variant="tabs" defaultActiveKey="/costumer/catagories">
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
<div style={{background:"cadetblue",height:"600px"}}>
<Outlet />
</div>
     
       </Container>       
    </div>
  )
}

export default CostumersMain
