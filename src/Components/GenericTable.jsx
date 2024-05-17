import React from 'react'
import '../App.css'
import Table from 'react-bootstrap/Table';

const GenericTable = (props) => {

  return (
    <div  >
      {props.data[0]?
      <table border={true}  style={{border:"2px solid black",background:"azure"}}>
      <thead style={{textAlign:"center"}}>
      <tr className="bottom-border">
      {
      
      props.KeysOrder.map((x)=>{
           return <th className="right-border">
            {
              x.includes('_')?
              <>{x.replace('_',' ')}</>
              :
              <>{x}</>
            }
            </th>
        })}
      </tr>
      </thead>
      <tbody >
        {props.data.map((x,index1)=>{
          let order = {}
          props.KeysOrder.forEach(element => {
            order = {...order,[element]:null}
          });
          let temp = Object.assign(order, x);
          return <tr key={index1} className="bottom-border">
            {Object.keys(temp).map((key,index2)=>{
              return <td key={index2} className="right-border">  
                {Object.prototype.toString.call(temp[key]) === '[object Array]'?<div><GenericTable KeysOrder ={temp[key][0]?Object.keys(temp[key][0]):<></>} data={temp[key]} /></div>:temp[key]?.toString()}           
                </td>
            })}
          </tr>
        })}
      </tbody>
      </table>
      :
      <></>
    }
      
    </div>
  )
}

export default GenericTable
