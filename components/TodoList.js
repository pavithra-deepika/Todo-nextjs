import { useEffect, useState } from "react"
import { collection, doc, setDoc, orderBy, onSnapshot,query} from "@firebase/firestore"; 
import {db} from '../firebase'
const TodoList = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
    const collectionRef = collection(db, "todos")
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (querysnapshort) => {
        setTodos(querysnapshort.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()})))

    });

    return unsubscribe;

},[])
    return(
        <div>
            {todos.map(todo => <div key={todo.id}>{todo.fruits}</div>)}
        </div>
    )

}
export default TodoList