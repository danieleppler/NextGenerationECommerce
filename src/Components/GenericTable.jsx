import React from 'react'
import Table from 'react-bootstrap/Table';

const GenericTable = (props) => {
  return (
    <div>
      <Table striped bordered hover variant="dark">
      <thead>
      <tr>
      {Object.keys(props.data[0]).map((x)=>{
           return <th>{x}</th>
        })}
      </tr>
      </thead>
      <tbody>
        {props.data.map((x)=>{
          return <tr>
            {Object.keys(x).map((key)=>{
              return <td>  
                {Object.prototype.toString.call(x[key]) === '[object Array]'?<div><GenericTable data={x[key]} /></div>:x[key].toString()}           
                </td>
            })}
          </tr>
        })}
      </tbody>
      </Table>
    </div>
  )
}

export default GenericTable
