import { useSelector } from "react-redux";
import { call, put, takeEvery } from "redux-saga/effects";
import { query,collection,getDocs,onSnapshot,updateDoc,doc, addDoc ,deleteDoc} from 'firebase/firestore'
import db from '../Utils/firebase'


const CurrentCatagories =[]

const CatagoriesFetch = async () =>{
    const q = query(collection(db, 'Categories'))
    const querySnapshot = await getDocs(q);
    const catagories= []
    querySnapshot.forEach(async (doc) => {
        catagories.push({
            id: doc.id,
            ...doc.data(),
          }) });
    
    return catagories;
}

const fetchCurrentCatagories = async () =>{
    CurrentCatagories = useSelector(state =>{
        return state?.Catagories
        })
}


function* sagaManagsagaUpdateCatagoriesExecuter(){
    
   
    let data = []
    if(sessionStorage.getItem("Admin_Catagories_First_Load") === 'true')
    {
        data = yield call(CatagoriesFetch)
        sessionStorage.setItem("Admin_Catagories_First_Load",false) 
        yield put({type:"UPDATE_CATAGORIES_SUCCESS",payload:data})
    }
    else
    {
        fetchCurrentCatagories()
        yield put({type:"UPDATE_CATAGORIES_SUCCESS",payload:CurrentCatagories})
    }
}


function* sagaUpdateCatagoriesWatcher(){
    yield takeEvery("UPDATE_CATAGORIES",sagaManagsagaUpdateCatagoriesExecuter)
}




export default sagaUpdateCatagoriesWatcher