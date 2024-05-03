const initialState={
    RegisteredUsers:[],
    Catagories:[] 
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
            state.Catagories[index] = action.payload.id;
            return {...state,Catagories:state.Catagories}
        }

        case "DELETE_CATAGORY":{
            const temp = state.Catagories.map((x) => x.id != action.payload)
            return {...state,Catagories:temp}
        }

        case "ADD_CATAGORY":
            return {...state,Catagories:[...state.Catagories,action.payload]}

        case "GET_CURRENT_SESSION_CATAGORIES":
            {
                return{
                    ...state,
                    Catagories:action.data
                }
            }

        default: 
            return state || initialState 
    }
}

export default Reducer
