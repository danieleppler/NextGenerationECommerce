import React, { useEffect, useState } from 'react'
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
   
    <div style={{
        borderRadius:"8px"
        ,boxShadow:"0 30px 40px rgba(0,0,0,.1)",
        border:"1px solid black",
        background:"beige",
        padding:"10px"}}>
    {FirstRun?SetFirstRun(false):<></>}
   <h2>{props.data.Title}</h2><br />
   <p>{props.data.Description}</p> <br />
   <p>Price : {props.data.Price}$</p>
   <p>In Stock: {props.data.InStock}</p> 
   <button style={{borderRadius:"14px"}} onClick={(e)=>{
      if(CurrentCount <= parseInt(props.data.InStock))
        SetCurrentCount(CurrentCount + 1)      
   }}> +</button>
   <input style={{borderRadius:"14px",width:"3%"}} value={props.data.Count}></input>
   <button style={{borderRadius:"14px"}} onClick={(e)=>{
        if(CurrentCount != 0)
          SetCurrentCount(CurrentCount -1)
   }}>-</button>
    <div style={{float:"right"}}>
        <img style={{width:"100%",height:"150px"}} src={props.data.Link_to_pic}></img>
    </div>
    <div >
        <p>Bought By {props.data.TotalBought}</p>
    </div>
    </div>
  )
}

export default Product
