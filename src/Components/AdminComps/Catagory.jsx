import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { render } from 'react-dom';



const Catagory = (props) => {
    const [textClicked,SettextClicked] = useState(false)
    const [updatedTitle,SetupdatedTitle] = useState(props.catagory.Title)


    const handleClick = ()=>{
        SettextClicked(!textClicked)
    }

    const handleUpdate = () =>{
      props.update({...props.catagory,Title:updatedTitle})
      SettextClicked(false)
    }
   
    useEffect(()=>{
      SetupdatedTitle(props.Title)
    },[])

  return (
    <div className='row'>
      <div className='col-md-3 offset-md-4'style={{marginBottom:"10px",marginTop:"10px"}} >
      <Card style={{margin:"10xp",textAlign:"center",border:"3px solid black",background:"AntiqueWhite"}}>  
      <Card.Body>
      {textClicked?
        <div>
        <Card.Text>
        <input value ={updatedTitle} onChange={(e)=>{SetupdatedTitle(e.target.value)}}></input>
        </Card.Text>
        <div className='row'>
        <Button className='col-md-4 offset-md-1' onClick={handleClick} variant="dark">Cancel</Button>
        <Button className='col-md-4 offset-md-2' onClick ={()=>{
          SettextClicked(false)
          }} variant="dark">update</Button>
        </div>
        </div>
        :
        <div >
        <Card.Text onClick={handleClick}><strong>{updatedTitle}</strong></Card.Text>
        <div className='row'>
        <Button className='col-md-4 offset-md-1' onClick={handleUpdate} variant="dark">update</Button>
        <Button className='col-md-4 offset-md-2' onClick = {()=>{props.delete(props.catagory.id)}} variant="dark">delete</Button>  
        </div>
        </div>
        }  
      </Card.Body>
      </Card>
        
    </div>

    </div>
   
  )
}

export default Catagory
