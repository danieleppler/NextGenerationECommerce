import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import db from '../../Utils/firebase'
import { onSnapshot,query,collection } from 'firebase/firestore'
import { useEffect,useState } from 'react'
import Product from './Product'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MyCart from './MyCart'
import { update } from 'firebase/database'
import { Update } from '../../Utils/firebaseRequests'
import { useNavigate } from 'react-router'


const CostumerProdcuts = () => {

  const CurrentProducts = useSelector((state)=>{
    return state?.rootReducer.Products
  })

  const CurrentCatagories = useSelector((state)=>{
    return state?.rootReducer.Catagories
  })

  const UserFromStore = useSelector((state)=>state?.rootReducer.CurrentLogedInUser)

  const [Products,SetProducts] = useState()
  const [Catagories,SetCatagories] = useState()
  const [FilterData,SetFilterData] =  useState({
    Catagory:"",
    Price:0,
    Title:""
  })

  const [Cart,SetCart] = useState([])
  const [MaxPrice,SetMaxPrice] = useState()
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const dispatch = useDispatch()
  const navigate  = useNavigate()

  const UpdateCart = (obj) =>{
    let temp = []
    if(obj.Count == 0 )
    {
      temp = Cart.filter((x)=>
        x.Title != obj.Title
      ) 
      SetCart(temp)
    }
    else
    {
      let index = Cart.findIndex((x)=>x.Title == obj.Title)
      if(index == -1)
        SetCart([...Cart,obj])
      else
      {
        let objCopy = [...Cart]
        objCopy[index] = {...objCopy[index],Count:obj.Count}
        SetCart(objCopy)        
      }
    }
    let tempProds  = Products
    let index = Products.findIndex((z)=> z.Title == obj.Title)
    tempProds[index]= {...tempProds[index],Count:obj.Count}
    SetProducts(tempProds) 
      
  }
  useEffect(()=>{
    const fetchProds = () =>{
      const q = query(collection(db, 'Products'))
      onSnapshot(q, (snapshot) => {
        SetProducts(snapshot.docs.map((doc)=>{
          let TotalBought = doc.data().Bought_By?.reduce((acc,x)=>acc + parseInt(x.qty),0)
          return {id: doc.id,
            Count:0,
            TotalBought:TotalBought,
          ...doc.data()
        
        }
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
    {
      CurrentProducts?.forEach((x,index)=>{
        let TotalBought = x.Bought_By?.reduce((acc,x)=>acc + parseInt(x.qty),0)
        CurrentProducts[index] = {...x,Count:0,TotalBought:TotalBought} 
      }
      )
      SetProducts(CurrentProducts)
    }
      

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
    let max = 0
    Products?.forEach(element => {
      if(parseInt(element.Price) > max)
        max = parseInt(element.Price)
    });
    SetMaxPrice(max)
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
  if(FilterData.Title)
    temp = temp.filter((x)=>x.Title.includes(FilterData.Title))
  else{
    temp = temp.filter((x)=>x.Category == FilterData.Catagory)
    temp = temp.filter((x)=>x.Price <= FilterData.Price)
  }
  
  
  SetProducts(temp)
}

const handleClear = () =>{
  SetFilterData({})
  SetProducts(CurrentProducts)
}

const OrderProds = () =>{
  let temp = UserFromStore
  let ProdsCopy = Products
  let Order = Cart.map((x)=>{
    const idx = Products.findIndex((z) => z.Title == x.Title )
    delete ProdsCopy[idx].Count
    delete ProdsCopy[idx].TotalBought
    if(UserFromStore.Permission)
      {
        ProdsCopy[idx] = {...ProdsCopy[idx],Bought_By:[...ProdsCopy[idx].Bought_By,{
          date:new Date().toString('dd/MM/yyyy'),
          name:UserFromStore.firstName +" "+ UserFromStore.lastName,
          qty : x.Count 
        }]}
      }
    ProdsCopy[idx] ={...ProdsCopy[idx],InStock:parseInt(ProdsCopy[idx].InStock) - parseInt(x.Count) }
    Update(ProdsCopy[idx],"Products")
    return {
      Title : x.Title,
      Qty: x.Count,
      Total: parseInt(x.Count) * parseInt(x.Price),
      Date: new Date().toString('dd/MM/yyyy') 
    }
  })

  dispatch({type:"UPDATE_PRODUCTS",payload:ProdsCopy})

  temp = {...temp,ProdcutsBought:[...temp.ProdcutsBought,...Order]}
  Update(temp,"RegisteredUsers")
  dispatch({type:"UPDATE_USER",payload:temp})

  

  navigate('/login')
}
  
  return (
    <div>
    <nav style={{border:"3px solid black"}} className="navbar sticky-top navbar-light bg-light">
      <div >
      Filter By Catagory: <select name ="Catagory" onChange={(e)=>{handleChange(e)}} >
        <option> </option>
        {
          Catagories?.map((x)=>{
            return <option name={x.Title}>{x.Title}</option>
          })
        }
      </select>
      <label for="customRange" className="form-label">Price</label>
      <input name = "Price" onChange={(e)=>{handleChange(e)}} 
      style={{width:"10%"}} type="range" className="form-range" id="customRange1" step="10" max={Math.ceil(MaxPrice) + 50}></input>
      {FilterData?.Price} $
      Title : <input name ="Title" onChange={(e)=>{handleChange(e)}} type="text"></input>
      <button onClick={()=>{handleClick()}}>Search</button>
      <button onClick={()=>{handleClear()}}>Clear</button>
      </div>
 
      
    </nav>
 



<div>
      <Button style={{position: "absolute",left:"0"}} variant="primary" onClick={handleShow}>
        Open Cart
      </Button>

      <Offcanvas show={showCart} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MyCart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
          Cart.length > 0?
          <MyCart updateFunc={UpdateCart} data={Cart} OrderProds = {OrderProds} />
        :
        <h3>No Products In Cart Yet</h3>
        }
         
        </Offcanvas.Body>
      </Offcanvas>
    </div>

    {
      Products?.map((x)=>{
        return <Product updateFunc={UpdateCart} data={x} />
      })
    }

    </div>
  )
}

export default CostumerProdcuts
