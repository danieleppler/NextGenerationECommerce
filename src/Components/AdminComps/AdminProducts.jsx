import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { query,onSnapshot,collection } from 'firebase/firestore'
import db from '../../Utils/firebase'
import Product from './Product'
import { Add,Update } from '../../Utils/firebaseRequests'
import {Container,Row,Col} from 'react-bootstrap'

const AdminProducts = () => {

  const dispatch = useDispatch()
  const [Products,SetProducts] = useState()
  const [Catagories,SetCatagories] = useState()
  const [AddNewClicked,SetAddNewClicked] =useState(false)
  const [NewProd,SetNewProd] = useState()

  const CurrentProducts = useSelector((state)=>{
    return state?.rootReducer.Products
  }
    
)

  const CurrentCatagories = useSelector((state)=>{
    return state?.rootReducer.Catagories
  })


     


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

const handleUpdate=async (obj) => {
  await Update(obj,'Products')
  dispatch({type:"UPDATE_PRODUCT",payload:obj})
}

const AddNew = async (obj) => {
  obj ={...obj,Bought_By:[]}
  const newId = await Add(obj,'Products')
  obj ={...obj,id:newId}
  dispatch({type:"ADD_PRODUCT",payload:obj})
}

const handleChange = (e)=>{
  SetNewProd({
    ...NewProd,
    [e.target.name]:e.target.value
  })
}

  return (
    <div>
        {
          Products?.map((x)=>{
            return <Product data={x} Catagories={Catagories?.map((x)=>x.Title)} update={handleUpdate}/>
          })
        }
      <button style={{marginTop:"10px",background:"cyan",borderRadius:"10px", border:"2px solid black"}} onClick={
        (e)=>{
          SetAddNewClicked(true)
        }
      }>Add New</button><br />
      {
        AddNewClicked?
        <div style={{padding:"10px",background:"rgb(134, 304, 124)",border:"1px solid red",borderRadius:"10px",marginTop:"10px",width:"50%"}}>
          <strong>Title :</strong> <input name="Title" onChange={handleChange} style={{height:"20px"}}></input> <br />
          <strong>Catagory :</strong><select name ="Category" onChange={handleChange}>
              {
                Catagories?.map((x)=>{
                return  <option value={x.Title}>{x.Title}</option>
               })
               }
        </select> <br />
        <strong>Price :</strong> <input name ="Price" onChange={handleChange} style={{height:"20px"}}></input> <br />
        <strong>Link to pic :</strong> <input name ="Link_to_pic" onChange={handleChange} style={{height:"20px"}}></input><br />
        <strong>Description :</strong> <textarea name ="Description" onChange={handleChange} style={{height:"20px"}}></textarea>  <br />
        <strong>Stock :</strong> <input name ="InStock" onChange={handleChange} style={{height:"20px"}}></input>
        <button onClick={(e)=>{
          AddNew(NewProd)
          SetAddNewClicked(false)
          }}>Save</button>
           <button onClick={(e)=>{
          SetAddNewClicked(false)
          }}>Cancel</button>          
        </div>  
        :
        <></>
      }
    </div>
  )
}

export default AdminProducts
