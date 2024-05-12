import React, { useState } from 'react'

const MyCart = (props) => {

    let TotalPrice = 0
  return (
    <div>
         {
            props.data?.map((x)=>{
              return  <div>
                {x.Title}
                <button onClick={()=>{props.updateFunc({
                    Title:x.Title,
                    Count:(x.Count + 1),
                    Price:x.Price
                })}}>+</button>
                {x.Count}
                <button onClick={()=>{props.updateFunc({
                    Title:x.Title,
                    Count:(x.Count - 1),
                    Price:x.Price
                })}}>-</button>
                Total : 
                {parseInt(x.Price) * parseInt(x.Count)} $
                <button style={{background:"red",opacity:"50%"}}>X</button>
                {TotalPrice = TotalPrice + parseInt(x.Price) * parseInt(x.Count)}
                </div>
        
            })
        }
        
        Total : {TotalPrice} $
        <button onClick = {()=>{
            props.OrderProds()
        }} style={{backgroundg:"green"}}>Order</button>
       
    </div>
  )
}

export default MyCart
