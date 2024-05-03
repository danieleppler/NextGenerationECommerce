import db from './firebase';
import { collection,updateDoc,doc, addDoc ,deleteDoc} from 'firebase/firestore'

const Update = async (obj,collectionName) => {
    await updateDoc(doc(db, collectionName, obj.id), obj);
  }
  
  const Delete  =async (id,collectionName) => {
    await deleteDoc(doc(db, collectionName, id));
  }
  
  const Add = async (obj,collectionName) => {
    await addDoc(collection(db, collectionName), obj);
  }

  export  { Add ,Update, Delete };