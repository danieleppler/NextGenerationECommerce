import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route,Routes,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AdminMain from './Components/AdminComps/AdminMain'
import AdminCatagories from './Components/AdminComps/AdminCatagories'
import AdminProducts from './Components/AdminComps/AdminProducts'
import AdminCustomers from './Components/AdminComps/AdminCustomers'
import AdminStatistics from './Components/AdminComps/AdminStatistics'
import 'bootstrap/dist/css/bootstrap.min.css'



import { useDispatch } from 'react-redux'
import CostumersMain from './Components/CostumersComps/CostumersMain'
import MyAccount from './Components/CostumersComps/MyAccount'
import MyOrders from './Components/CostumersComps/MyOrders'
import CostumerProdcuts from './Components/CostumersComps/CostumerProdcuts'

function App() {

 
  const dispatch = useDispatch()

  useEffect(()=>{
    if(sessionStorage.getItem("FirstRun") === null)
    {
      dispatch({type:"RESET_STORE"})
      sessionStorage.setItem("FirstRun",false)
      sessionStorage.setItem("Admin_Catagories_First_Load",true) 
      sessionStorage.setItem("Users_First_Load",true) 
      sessionStorage.setItem("Admin_Products_First_Load",true)
    }

    
  },[])

 

  return (
    <div>
    <Routes>
    <Route path='/' element={<Navigate replace to="/login" />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />}></Route>

    <Route path='/admin' element={<AdminMain />}>
      <Route path='Catagories' element={<AdminCatagories />} />
      <Route path='Products' element={<AdminProducts />} />
      <Route path='Customers' element={<AdminCustomers />} />
      <Route path='Statistics' element={<AdminStatistics />} />
    </Route>

    <Route path='costumer' element={<CostumersMain />}>
      <Route path='Account' element={<MyAccount />}></Route>
      <Route path='Orders' element={<MyOrders />}></Route>
      <Route path='Products' element={<CostumerProdcuts />}></Route>
    </Route>
    
    </Routes>
    </div>
  )
}

export default App
