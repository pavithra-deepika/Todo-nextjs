import { useEffect, useState } from "react"
import { ModeComment } from "@mui/icons-material"
import { collection, doc, setDoc, orderBy, where, onSnapshot,query} from "@firebase/firestore"; 
import {db} from '../firebase'
import Todo from '../components/todo'
const TodoList = () => {
        

    const [todos, setTodos] = useState([])
    useEffect(() => {
    const collectionRef = collection(db, "todos")
    const q = query(collectionRef, where("status", "==" , true ), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (querysnapshort) => {
        setTodos(querysnapshort.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()})))

    });

    return unsubscribe;

},[])
    return(
        <div>
            <pre>{JSON.stringify(todos,null,'\t')}</pre>
            {todos.map(todo => (<Todo key={todo.id}
            id={todo.id}
            title={todo.title}
            detail={todo.detail}
            timestamp={todo.timestamp}
            />))
           }
        </div>
    )

}
export default TodoList