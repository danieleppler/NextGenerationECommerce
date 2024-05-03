import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import db from "../Utils/firebase.js"
import { onSnapshot,query,collection } from 'firebase/firestore';


//Bootstrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { connectStorageEmulator } from 'firebase/storage';



const Login = () => {

const dispatch  = useDispatch()
const nav = useNavigate()

const tempUsers = useSelector(state =>{ return state?.rootReducer.RegisteredUsers})

const [Errors,SetErrors] = useState({
  username:"",
  password:""
})
const [submitted,Setsubmitted] = useState(false)
const [RegisteredUsers,SetRegisteredUsers] = useState()
const [FormData,SetFormData] = useState()

  useEffect(()=>{
    const fetchData =async ()=>{
      const q = await query(collection(db, 'RegisteredUsers'))
      onSnapshot(q, (snapshot) => {
        SetRegisteredUsers(snapshot.docs.map((doc) => doc.data()))
    })
    }
    if(sessionStorage.getItem("Users_First_Load") === 'true')
      fetchData()
    else
      SetRegisteredUsers(tempUsers)
  },[])

  useEffect(()=>{
    if(sessionStorage.getItem("Users_First_Load") === 'true')
      if(RegisteredUsers)
      {
        dispatch({type:"UPDATE_REGISTERED_USERS",payload:RegisteredUsers})
        sessionStorage.setItem("Users_First_Load",false)
      }
  },[RegisteredUsers])


const findFormErrors = () =>{

  const NewErrors = []
  const user = RegisteredUsers?.find((x)=>x.UserName == FormData.Username)
  if(!user){
    NewErrors.username = "User not found"
    return NewErrors;
  }
  if(user.Password != FormData.Password)
    NewErrors.password = "Password is Incorrect!"

    return NewErrors
}

const handleSubmit  = (e)=>{
  e.preventDefault()
  const newErrors = findFormErrors()
    
    if ( Object.keys(newErrors).length > 0 ) {
      SetErrors(newErrors)
    }
    else{
      nav('/admin')
    } 
  Setsubmitted(true)
}

const handleChange = (e) => {
  const { name, value } = e.target;
  SetFormData({
      ...FormData,
      [name]: value,
  });
};

  return (
    <div className='container General'>
      {console.log("Component rendered")}
        <h2>Next Generation E-Commerce App</h2>

   <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><strong>UserName</strong></Form.Label>
        <Form.Control 
        type="text" 
        name="Username"
        placeholder="Enter username" 
        onChange={(e)=>handleChange(e)}
        isInvalid={submitted && Errors.username}
        />
         <Form.Control.Feedback type="invalid">
          {Errors.username}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <Form.Control 
        type="password"
        name="Password"
        placeholder="Password"
        onChange={(e)=>handleChange(e)}
        isInvalid={submitted && Errors.password}
        />
            <Form.Control.Feedback type="invalid">
          {Errors.password}
          </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button><br />
      <span>New users? <Link to="/register"> Register</Link></span>
    </Form>   
    </div>
    
   
      
  )
}

export default Login
