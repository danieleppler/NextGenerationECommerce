import React from 'react'
import { useSelector } from 'react-redux'
import { Pie } from 'react-chartjs-2'
const PieChart = (props) => {

    
  return (
    <div>
      <Pie>data = {props.data}</Pie> 
      </div>
  )
}

export default PieChart
