import React, { useEffect, useState } from 'react'
import { query,collection,onSnapshot} from 'firebase/firestore'
import db from '../../Utils/firebase'
import Catagory from './Catagory'
import {Delete,Add,Update} from '../../Utils/firebaseRequests'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css'

const AdminCatagories = () => {

  const [Catagories,SetCatagories] = useState()
  const [newCatagory,SetnewCatagory] = useState({})

  const notifyAddedNew = () => toast("Catagory successfuly added !",{
    className:"toast-message"
  });
  
  const notifyUpdated = () => toast("Catagory successfuly updated !",{
    className:"toast-message"
  });

  const notifyDeleted = () => toast("Catagory successfuly deleted !",{
    className:"toast-message"
  });

  const dispatch = useDispatch()
  
  const CurrentCatagories = useSelector(state =>{ 
    return state?.rootReducer.Catagories
  })

  useEffect(()=>{
    const fetchData = () =>{
      const q = query(collection(db, 'Categories'))
      onSnapshot(q, (snapshot) => {
        SetCatagories(snapshot.docs.map((doc)=>{
          return {id: doc.id,
          ...doc.data()}
        }))
      })
    }
    if(sessionStorage.getItem("Admin_Catagories_First_Load") === 'true')
      fetchData()   
    else
      SetCatagories(CurrentCatagories)
  },[])



useEffect(()=>{
  if(sessionStorage.getItem("Admin_Catagories_First_Load") === 'true' && Catagories)
  {
    dispatch({type:"UPDATE_CATAGORIES",payload:Catagories})
    sessionStorage.setItem("Admin_Catagories_First_Load",false)
  }
},[Catagories])

useEffect(()=>{
  if(CurrentCatagories.length > 0 )
    SetCatagories(CurrentCatagories)
},[CurrentCatagories])



const handleUpdate=async (obj) => {
  await Update(obj,'Categories')
  dispatch({type:"UPDATE_CATAGORY",payload:obj})
  notifyUpdated()
}

const handleDelete  =async (id) => {
  await Delete(id,'Categories')
  dispatch({type:"DELETE_CATAGORY",payload:id})
  notifyDeleted()
}

const AddNew = async () => {
  const newId = await Add({Title:newCatagory},'Categories')
  const obj = {Title:newCatagory,id:newId}
  dispatch({type:"ADD_CATAGORY",payload:obj})
  notifyAddedNew()
}

  return (
    
    <div className='container text-centers' >
      <ToastContainer />
    <div >
      {Catagories?.map((x,index)=>{
          return <div key={index}>
          <Catagory Title = {x.Title} catagory={x} update={handleUpdate} delete={handleDelete}/>
        </div>
      })}
      </div>
      <div className='row'>
        <div  className ='offset-md-4' >
        <input type="text" placeholder='Add new category' onChange={(e)=>{
          SetnewCatagory(e.target.value)
          }} style={{marginRight:"3px"}}></input>
        <button onClick={AddNew} style={{background:"AntiqueWhite",width:"107px",border:"3px solid black"}}>Add</button>
        </div>
      </div>
          </div>
  )
}

export default AdminCatagories
