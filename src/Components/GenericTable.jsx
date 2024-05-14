import React from 'react'
import Table from 'react-bootstrap/Table';

const GenericTable = (props) => {
  let JsonOrder = {}

  return (
    <div  className ='col-md-8 offset-md-2' >
      {props.data[0]?
      <Table striped bordered hover variant="light" size="sm" >
      <thead>
      <tr>
      {
      
      props.KeysOrder.map((x)=>{
           return <th>
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
      <tbody>
        {props.data.map((x,index1)=>{
          let order = {}
          props.KeysOrder.forEach(element => {
            order = {...order,[element]:null}
          });
          let temp = Object.assign(order, x);
          return <tr key={index1}>
            {Object.keys(temp).map((key,index2)=>{
              return <td key={index2}>  
                {Object.prototype.toString.call(temp[key]) === '[object Array]'?<div><GenericTable KeysOrder ={temp[key][0]?Object.keys(temp[key][0]):<></>} data={temp[key]} /></div>:temp[key]?.toString()}           
                </td>
            })}
          </tr>
        })}
      </tbody>
      </Table>
      :
      <></>
    }
      
    </div>
  )
}

export default GenericTable
