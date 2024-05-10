import React, { useEffect, useState } from 'react'
import { Form,Button,Container,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Update } from '../../Utils/firebaseRequests'


const MyAccount = () => {

  const UserFromStore = useSelector((state)=>state?.rootReducer.CurrentLogedInUser)
  const RegisteredUsers = useSelector((state) => state?.rootReducer.RegisteredUsers)
  

  const dispatch = useDispatch()

  const [CurrentUser,SetCurrentUser] = useState()

  useEffect(()=>{
    SetCurrentUser(UserFromStore)
  },[UserFromStore])

  const handleChange = (e)=>{
    SetCurrentUser({...CurrentUser,[e.target.name]:e.target.value})
  }

  const [submitted, setsubmitted] = useState(false);
  const [Errors,setErrors] = useState({
    fName: "",
    lName: "",
    user:"",
    pass: "",
  })
  
const findFormErrors = () =>{
  const { firstName,lastName, Password, UserName } = CurrentUser
  const newErrors = {}
  // pass errors
  if ( !Password || Password === '' ) newErrors.pass = 'Please Insert Password'
  else if ( Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) == null ) 
    newErrors.pass = 'PassWord must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
  // username errors
  if ( !UserName || UserName === '' ) newErrors.user = 'Please Insert UserName'
  else if (RegisteredUsers?.find((x)=>x.UserName == UserName && x.UserName != UserFromStore.UserName)) newErrors.user = 'UserName is already taken!'
  //names errors
  if ( !firstName || firstName === '' ) newErrors.fName = 'Please Insert first Name'
  if ( !lastName || lastName === '' ) newErrors.lName = 'Please Insert last Name'
  return newErrors
}

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } 
    else{
      Update(CurrentUser,"RegisteredUsers")
      dispatch({type:"UPDATE_USER",payload:CurrentUser})
      dispatch({type:"UPDATE_CURRENT_LOGGED_IN_USER",payload:CurrentUser})
    }
    setsubmitted(true);
    };



  return (
    <Container>

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><strong>First Name</strong></Form.Label>
        <Form.Control 
        type="text" 
        name="firstName"
        placeholder={CurrentUser?.firstName} 
        onChange={(e)=>handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><strong>Last Name</strong></Form.Label>
        <Form.Control 
        type="text" 
        name="lastName"
        placeholder={CurrentUser?.lastName} 
        onChange={(e)=>handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><strong>UserName</strong></Form.Label>
        <Form.Control 
        type="text" 
        name="UserName"
        placeholder={CurrentUser?.UserName}
        onChange={(e)=>handleChange(e)}
        isInvalid={submitted && Errors.user}
        />
         <Form.Control.Feedback type="invalid">
          {Errors.user}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <Form.Control 
        type="type"
        name="Password"
        placeholder={CurrentUser?.Password}
        onChange={(e)=>handleChange(e)}
        isInvalid={submitted && Errors.pass}
        />
            <Form.Control.Feedback type="invalid">
          {Errors.pass}
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Check
        label="Allow others to see my orders"
        name="Permission"
        value={CurrentUser?.Permission}
      onChange={(e)=>{
        SetCurrentUser({...CurrentUser,Permission:e.target.checked})
      }}
      />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button><br />
      </Form>

    </Container>
  )
}

export default MyAccount