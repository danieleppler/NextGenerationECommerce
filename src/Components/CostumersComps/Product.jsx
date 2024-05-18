import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { First } from 'react-bootstrap/esm/PageItem'
import { useToast } from 'react-toastify'

const Product = (props) => {

    const [CurrentCount,SetCurrentCount] = useState(0)
    const [FirstRun,SetFirstRun] = useState(true)
    
    const handleUpdate = () =>{
      props.updateFunc({
        Title:props.data.Title,
        Count:CurrentCount,
        Price:props.data.Price
      })
    }

    useEffect(()=>{
      SetCurrentCount(props.data.Count)
    },[props])


    useEffect(()=>{
      if(!FirstRun)
        handleUpdate()
    },[CurrentCount])

  return (
   
    <div  style={{
        borderRadius:"8px"
        ,boxShadow:"0 30px 40px rgba(0,0,0,.1)",
        border:"2px solid black",
        background:"beige",
        padding:"10px",
        marginTop:"10px",
        width:"100%",
       height:"400px"}} >
    {FirstRun?SetFirstRun(false):<></>}
    <Container>
      <Row>
        <Col>
        <h2 style={{fontFamily:"fantasy"}}>{props.data.Title}</h2><br />
        <strong><p style={{width:"200px"}}>{props.data.Description}</p></strong> 
        <strong><p style={{fontFamily:"monospace"}}>Price : {props.data.Price}$</p></strong>
        <strong><p style={{fontFamily:"monospace"}}>In Stock: {props.data.InStock}</p></strong> 
        <button style={{borderRadius:"14px"}} onClick={(e)=>{
        if(CurrentCount < parseInt(props.data.InStock))
          SetCurrentCount(CurrentCount + 1)      
          }}><strong> + </strong></button>
        <input style={{borderRadius:"14px",width:"10%"}} value={props.data.Count}></input>
        <button style={{borderRadius:"14px"}} onClick={(e)=>{
        if(CurrentCount != 0)
          SetCurrentCount(CurrentCount -1)
         }}>-</button><br /><br />
          <strong style={{fontFamily:"monospace"}}><p>Bought By {props.data.TotalBought}</p></strong>
        </Col>
      <Col style={{marginTop:"20px"}} className='offset-sm-6'>
      <img style={{width:"300px",height:"300px",border:"3px solid black"}} src={props.data.Link_to_pic}></img>
      </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Product
