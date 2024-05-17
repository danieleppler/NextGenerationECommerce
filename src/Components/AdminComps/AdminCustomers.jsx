import React, { useEffect, useState } from 'react'
import GenericTable from '../GenericTable'
import { useSelector,useDispatch } from 'react-redux'

const AdminCustomers = () => {



  const [Costumers,SetCostumers] = useState()
  const CurrentCostumers = useSelector(state =>{ 
    return state?.rootReducer.RegisteredUsers
  })

  useEffect(()=>{
    const temp = CurrentCostumers.map((x)=>{
      return {Full_Name:x.firstName +" "+ x.lastName,Joined_At:x.JoinedAt,Prodcuts_Bought:x.ProdcutsBought}
    })
    SetCostumers(temp)}
    ,[])
    
      
  return (
    <div style={{marginLeft:"140px"}}>
    {Costumers && <GenericTable KeysOrder = {['Full_Name','Joined_At','Prodcuts_Bought']} data={Costumers} />}      
    </div>
  )
}

export default AdminCustomers
