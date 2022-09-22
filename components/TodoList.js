import { useEffect, useState } from "react"
import { ModeComment } from "@mui/icons-material"
import { collection, doc, setDoc, orderBy, onSnapshot,query} from "@firebase/firestore"; 
import {db} from '../firebase'
import Todo from '../components/todo'
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
            {todos.map(todo => <Todo key={todo.id}
            title={todo.title}
            detail={todo.detail}
            timestamp={todo.timestamp}
            />)}
        </div>
    )

}
export default TodoList