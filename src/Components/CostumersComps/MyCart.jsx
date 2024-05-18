import React, { useState } from 'react'

const MyCart = (props) => {

    let TotalPrice = 0

  return (
    <div>
         {
            props.data?.map((x)=>{
              TotalPrice = TotalPrice + parseInt(x.Price) * parseInt(x.Count)
              return  <div>
                <span style={{fontSize:"12px"}}>{x.Title}</span><span>&nbsp;</span>
                <button style={{fontSize:"10px"}} onClick={()=>{props.updateFunc({
                    Title:x.Title,
                    Count:(x.Count + 1),
                    Price:x.Price
                })}}>+</button><span>&nbsp;</span>
                <span style={{fontSize:"10px"}}>{x.Count}</span><span>&nbsp;</span>
                <button onClick={()=>{props.updateFunc({
                    Title:x.Title,
                    Count:(x.Count - 1),
                    Price:x.Price
                })}} style={{fontSize:"10px"}}>-</button><span>&nbsp;</span>
                <span style={{fontSize:"13px"}}>Total : </span><span>&nbsp;</span>
                <span style={{fontSize:"12px"}}>{parseInt(x.Price) * parseInt(x.Count)} $</span><span>&nbsp;</span>
                <button onClick ={()=>{
                  props.updateFunc({
                    Title:x.Title,
                    Count:(0),
                    Price:x.Price})

                }} style={{background:"red",opacity:"50%",fontSize:"10px"}}>X</button><span>&nbsp;</span><br />
                <br />
                </div>
              
            })
        }
        <br />
        <div style={{marginLeft:"70px"}}>
        Total : {TotalPrice} $<span>&nbsp;</span>
        <button onClick = {()=>{
            props.OrderProds()
        }} style={{backgroundg:"green"}}>Order</button>
        </div>
        
       
    </div>
  )
}

export default MyCart
