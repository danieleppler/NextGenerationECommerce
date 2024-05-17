import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { query,onSnapshot,collection } from 'firebase/firestore'
import db from '../../Utils/firebase'
import Product from './Product'
import { Add,Update } from '../../Utils/firebaseRequests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminProducts = () => {

  const dispatch = useDispatch()
  const [Products,SetProducts] = useState()
  const [Catagories,SetCatagories] = useState()
  const [AddNewClicked,SetAddNewClicked] =useState(false)
  const [NewProd,SetNewProd] = useState()

  const notifyAddedNew = () => toast("Product successfuly added !",{
    className:"toast-message"
  });
  
  const notifyUpdated = () => toast("Product successfuly updated !",{
    className:"toast-message"
  });

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
  notifyUpdated()
}

const AddNew = async (obj) => {
  obj ={...obj,Bought_By:[]}
  const newId = await Add(obj,'Products')
  obj ={...obj,id:newId}
  dispatch({type:"ADD_PRODUCT",payload:obj})
  notifyAddedNew()
}

const handleChange = (e)=>{
  SetNewProd({
    ...NewProd,
    [e.target.name]:e.target.value
  })
}

  return (
    <div>
      <ToastContainer />
        {
         
          Products?.map((x)=>{
            return <Product data={x} Catagories={Catagories?.map((x)=>x.Title)} update={handleUpdate}/>
          })
        }
      <button style={{border:"3px solid black",marginLeft:"10px"}} onClick={
        (e)=>{
          SetAddNewClicked(true)
        }
      }>Add New</button><br />
      {
        AddNewClicked?
        <div style={{margin:"10xp",border:"3px solid black",background:"AntiqueWhite",padding:"10px",margin:"10px",width:"50%"}}> 
          <strong>Title :</strong> <input name="Title" onChange={handleChange} style={{height:"20px"}}></input> <br /><br />
          <strong>Catagory :</strong><select name ="Category" onChange={handleChange}> 
              {
                Catagories?.map((x)=>{
                return  <option value={x.Title}>{x.Title}</option>
               })
               }
        </select> <br /> <br />
        <strong>Price :</strong> <input name ="Price" onChange={handleChange} style={{height:"20px"}}></input> <span>&nbsp;&nbsp;</span> <strong>$</strong><br /><br />
        <strong>Link to pic :</strong> <input name ="Link_to_pic" onChange={handleChange} style={{height:"20px"}}></input> <br /><br />
        <strong>Description :</strong> <textarea name ="Description" onChange={handleChange} style={{height:"20px"}}></textarea>  <br />
        <strong>Stock :</strong> <input name ="InStock" onChange={handleChange} style={{height:"20px"}}></input><span>&nbsp;&nbsp;</span><br /><br />
        <button onClick={(e)=>{
          AddNew(NewProd)
          SetAddNewClicked(false)
          }}>Save</button> <span>&nbsp;&nbsp;</span>
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
