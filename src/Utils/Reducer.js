import Product from "../Components/AdminComps/Product"

const initialState={
    RegisteredUsers:[],
    Catagories:[],
    Products:[],
    CurrentLogedInUser:{} 
}

const Reducer = (state = initialState,action)=>{
    switch(action.type)
    {
        case "UPDATE_REGISTERED_USERS":
            return {...state,RegisteredUsers:[...state.RegisteredUsers,...action.payload]}

        case "ADD_USER":
            return {...state,RegisteredUsers:[...state.RegisteredUsers,action.payload]}

        case "UPDATE_CATAGORIES":
            return {...state,Catagories:[...state.Catagories,...action.payload]}

        case "UPDATE_CATAGORY":{
            const index = state.Catagories.findIndex((x) => x.id === action.payload.id)
            const temp =[...state.Catagories]
            temp[index] = action.payload
            return {...state,Catagories:temp}
        }

        case "DELETE_CATAGORY":{
            const temp = state.Catagories.filter((x) => x.id != action.payload)
            return {...state,Catagories:temp}
        }

        case "ADD_CATAGORY":
            return {...state,Catagories:[...state.Catagories,action.payload]}

        case "ADD_PRODUCT":
            return {...state,Products:[...state.Products,action.payload]}

        case "UPDATE_PRODUCTS":
            return {...state,Products:[...state.Products,...action.payload]}

        case "UPDATE_PRODUCT":
            {
                const index = state.Products.findIndex((x) => x.id === action.payload.id)
                let temp = [...state.Products]
                temp[index] = action.payload
                return {...state,Products:temp}
            }
        
        case "UPDATE_USER":
            {
                    const index = state.Products.findIndex((x) => x.id === action.payload.id)
                    let temp = [...state.Products]
                    temp[index] = action.payload
                    return {...state,Products:temp}
            }
            

        case "UPDATE_CURRENT_LOGGED_IN_USER":{
            {
                return {...state,CurrentLogedInUser:action.payload}
            }
        }
            
        case "RESET_STORE":
            return initialState

        default: 
            return state || initialState 
    }
}

export default Reducer
