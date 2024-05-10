import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import db from '../../Utils/firebase'
import { onSnapshot,query,collection } from 'firebase/firestore'
import { useEffect,useState } from 'react'
import Product from './Product'

const CostumerProdcuts = () => {

  const CurrentProducts = useSelector((state)=>{
    return state?.rootReducer.Products
  })

  const CurrentCatagories = useSelector((state)=>{
    return state?.rootReducer.Catagories
  })

  const [Products,SetProducts] = useState()
  const [Catagories,SetCatagories] = useState()
  const [FilterData,SetFilterData] =  useState({
    Catagory:"",
    Price:0,
    Title:""
  })

  const dispatch = useDispatch()


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

    const fetchCatagories = () =>{
      const q = query(collection(db, 'Categories'))
      onSnapshot(q, (snapshot) => {
        SetCatagories(snapshot.docs.map((doc)=>{
          return {id: doc.id,
          ...doc.data()}
        }))
      })
    }

    if(sessionStorage.getItem("Admin_Products_First_Load") === 'true')
      fetchProds()   
    else
      SetProducts(CurrentProducts)

    if(sessionStorage.getItem("Admin_Catagories_First_Load") === 'true')
      fetchCatagories()   
    else
      SetCatagories(CurrentCatagories)
  },[])

  useEffect(()=>{
    if(sessionStorage.getItem("Admin_Products_First_Load") === 'true' && Products)
    {
      dispatch({type:"UPDATE_PRODUCTS",payload:Products})
      sessionStorage.setItem("Admin_Products_First_Load",false)
    }
  },[Products])

  useEffect(()=>{
    if(sessionStorage.getItem("Admin_Catagories_First_Load") === 'true' && Catagories)
    {
      dispatch({type:"UPDATE_CATAGORIES",payload:Catagories})
      sessionStorage.setItem("Admin_Catagories_First_Load",false)
    }
  },[Catagories])
 

  useEffect(()=>{
    if(CurrentProducts.length > 0){
      SetProducts(CurrentProducts)
    }
  },[CurrentProducts])

const handleChange = (e)=>{[
  SetFilterData({...FilterData,[e.target.name]:e.target.value})
]}

const handleClick = () =>{
  let temp = [...CurrentProducts]
  temp = temp.filter((x)=>x.Catagory === FilterData.Catagory)
  temp = temp.filter((x)=>x.Price <= FilterData.Price)
  temp = temp.filter((x)=>x.Title.includes(FilterData.Title))
  SetProducts(temp)
}

const handleClear = () =>{
  SetFilterData({})
  SetProducts(CurrentProducts)
}
  
  return (
    <div>
    <nav style={{border:"3px solid black"}} className="navbar sticky-top navbar-light bg-light">
      <div >
      Filter By Catagory: <select name ="Catagory" onChange={(e)=>{handleChange(e)}} defaultValue={FilterData.Catagory}>
        {
          Catagories?.map((x)=>{
            return <option name={x.Title}>{x.Title}</option>
          })
        }
      </select>
      <label for="customRange" className="form-label">Price</label>
      <input name = "Price" onChange={(e)=>{handleChange(e)}} 
      style={{width:"10%"}} type="range" className="form-range" id="customRange1" step="10" max="2000"></input>
      {FilterData?.Price} $
      Title : <input name ="Title" onChange={(e)=>{handleChange(e)}} type="text"></input>
      <button onClick={()=>{handleClick()}}>Search</button>
      <button onClick={()=>{handleClear()}}>Clear</button>
      </div>
 
      
    </nav>
    {
      Products?.map((x)=>{
        return <Product data={x} />
      })
    }
    </div>
  )
}

export default CostumerProdcuts
