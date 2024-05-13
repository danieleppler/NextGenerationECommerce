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
    <div>
    {Costumers && <GenericTable data={Costumers} />}      
    </div>
  )
}

export default AdminCustomers
