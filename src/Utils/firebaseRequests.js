import db from './firebase';
import { collection,updateDoc,doc, addDoc ,deleteDoc} from 'firebase/firestore'

const Update = async (obj,collectionName) => {
    await updateDoc(doc(db, collectionName, obj.id), obj);
  }
  
  const Delete  =async (id,collectionName) => {
    await deleteDoc(doc(db, collectionName, id));
  }
  
  const Add = async (obj,collectionName) => {
    const id = await addDoc(collection(db, collectionName), obj).then(docRef=>{
      return docRef.id
    });
    return id
  }

  export  { Add ,Update, Delete };