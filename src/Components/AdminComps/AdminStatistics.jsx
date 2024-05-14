import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PieChart from '../StatisticsComps/PieChart'
import { Bar, Chart, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { query,onSnapshot,collection } from 'firebase/firestore'
import db from '../../Utils/firebase';
import { useDispatch} from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { retry } from '@reduxjs/toolkit/query';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,LinearScale,BarElement);

const AdminStatistics = () => {
  const CurrentProds = useSelector((state) => state?.rootReducer.Products)
  const CurrentUsers = useSelector((state) => state?.rootReducer.RegisteredUsers)

  const dispatch = useDispatch()
 
  const [ChartData,SetChartData] = useState({labels:[],datasets:[]})
  const [Products,SetProducts] =  useState()
  const [PieData,SetPieData] = useState()
  const [FilterByUser,SetFilterByUser] = useState()
  const [RegisteredUsers,SetRegisteredUsers] = useState()

  
  
  useEffect(()=>{
    let DataSetSTotal = [{label:"Qty",backgroundColor:[],data:[],
    borderWidth: 1,}]

    let LabelsTotal=[];
    let LabelsColors = []

    for(let i = 0 ; i < CurrentProds?.length ; i++)
      {
        LabelsColors[i] ="#" + ((1 << 23) * (Math.random() + 1) | 0).toString(16).padStart(6, "0")
      }
    
    DataSetSTotal[0] = {...DataSetSTotal[0],backgroundColor:LabelsColors}

    CurrentProds?.forEach(x => {
      const ProdName = x.Title
      const Qty = x.Bought_By?.map((z)=>{
        return z.qty
      }).reduce((a,b)=>parseInt(a)+parseInt(b),0
    )
    LabelsTotal = [...LabelsTotal,ProdName]
    let obj = DataSetSTotal[0]
    obj =  {...obj,data:[...obj.data,Qty]}
    DataSetSTotal[0] = obj
    });
    SetChartData({labels:LabelsTotal,datasets:DataSetSTotal})  
    SetPieData({labels:LabelsTotal,datasets:DataSetSTotal})  
  },[CurrentProds])


  useEffect(()=>{
    const fetchProds = () =>{
      const q = query(collection(db, 'Products'))
      onSnapshot(q, (snapshot) => {
        SetProducts(snapshot.docs.map((doc)=>{
          return {id: doc.id,
          ...doc.data()}
        }))
      })
    }

    if(sessionStorage.getItem("Admin_Products_First_Load") === 'true')
      fetchProds()   
    else
      SetProducts(CurrentProds)
  },[])

  useEffect(()=>{
    if(sessionStorage.getItem("Admin_Products_First_Load") === 'true' && Products)
    {
      dispatch({type:"UPDATE_PRODUCTS",payload:Products})
      sessionStorage.setItem("Admin_Products_First_Load",false)
    }
  },[Products])


  useEffect(()=>{
    

    if(ChartData.datasets.length > 0 )
      {
        let QtyTotal = []

    CurrentProds?.forEach(x => {
        const Qty = x.Bought_By?.map((z)=>{
          if(z.name === FilterByUser)
            return z.qty
          else return 0 
      }).reduce((a,b)=>parseInt(a)+parseInt(b),0)
      QtyTotal = [...QtyTotal,Qty]
    })

    let obj = ChartData.datasets[0]
    obj =  {...obj,data:QtyTotal}
    SetChartData({...ChartData,datasets:[obj]})  
      }
   
  },[FilterByUser])

  return (
    <Container>
      <Row>
        <Col style={{height:"200px"}}>
        {PieData?.datasets.length > 0?<><Pie data={PieData}/></>:<></>}
        </Col>
        <Col>
        Sort By Costumer : <select onChange={(e)=>{SetFilterByUser(e.target.value)}}>
          <option> </option>
          {
            CurrentUsers?.map((x)=>{
              return <option name={x.username} >{x.firstName + ' ' + x.lastName}  </option>
            })
          }
          </select> <br /><br />
        {ChartData?.datasets.length > 0?<><Bar data={ChartData}/></>:<></>}
        </Col>
      </Row>
    </Container>
    
  )
}

export default AdminStatistics
