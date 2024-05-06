import React from 'react'
import Table from 'react-bootstrap/Table';

const GenericTable = (props) => {
  return (
    <div  className ='col-md-8 offset-md-2' >
      {props.data[0]?
      <Table striped bordered hover variant="light" size="sm" >
      <thead>
      <tr>
      {Object.keys(props.data[0]).map((x)=>{
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
          return <tr key={index1}>
            {Object.keys(x).map((key,index2)=>{
              return <td key={index2}>  
                {Object.prototype.toString.call(x[key]) === '[object Array]'?<div><GenericTable data={x[key]} /></div>:x[key].toString()}           
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
