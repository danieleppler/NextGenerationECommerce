import React, { useEffect, useState } from 'react'
import {Col,Row,Container, Card } from 'react-bootstrap'
import GenericTable from '../GenericTable'


const Product = (props) => {

  const [Product,SetProduct] = useState()

  useEffect(()=>{
    SetProduct(props.data)
  },[])

  return (
    <Container style={{background:"gray",height:"200px",border:"2px solid black",padding:"10px"}}>
      <div className='row align-items-start'>
      <Row>
        <Col className='col-md-4'>
          <strong>Title : </strong><input value={Product?.Title} onChange={(e)=>{SetProduct({...Product,Title:e.target.value})}}></input>
        </Col>
        <Col className='col-md-4'>
        <strong>Description:</strong><></>
        </Col>
        <Col className='col-md-4'>
        <strong>Bought By:</strong>
        </Col>
        </Row>
        <Row>
          <Col className='col-md-4'>
          <strong>Catagory : </strong> <select defaultValue={props.data.Catagory} >
              {
                props.Catagories.map((x)=>{
                return  <option value={x}>{x}</option>
               })
               }
        </select> <br />
        <strong>Price : </strong><input value={Product?.Price} onChange={(e)=>{SetProduct({...Product,Price:e.target.value})}}></input><br />
        <strong>Link to pic : </strong><input value={Product?.Link_to_pic} onChange={(e)=>{SetProduct({...Product,Link_to_pic:e.target.value})}}></input>   
          </Col>
          <Col className='col-md-4'>
          ​<textarea class="notesheet" rows="3" cols="40"  onChange ={(e)=>{SetProduct({...Product,Description:e.target.value})}} value={Product?.Description}></textarea>
          </Col>
          <Col className='col-md-4'>
          <GenericTable data={props.data.Bought_By} />
          </Col>
        </Row>
        <Row>
          <Col>
          <strong>In Stock : </strong><input value={Product?.InStock} onChange ={(e)=>{SetProduct({...Product,InStock:e.target.value})}}></input>
          </Col>
        </Row>
        <Row>
          <Col>
          <button onClick={()=>{props.update(Product)}}>Save</button>
          </Col>
        </Row>
      </div>
          </Container>
    
  )
}

export default Product
