import { useEffect, useState } from "react"
import { ModeComment } from "@mui/icons-material"
import { collection, doc, setDoc, orderBy, onSnapshot,query} from "@firebase/firestore"; 
import {db} from '../firebase'
import Todo from '../components/todo'
const TodoList = () => {
 
    const [todos, setTodos] = useState([])
    const [favTodos, setFavTodos] = useState([])
    const [nonFavTodos, setNonFavTodos] = useState([])

    useEffect(() => {
    const collectionRef = collection(db, "todos")
    const q = query(collectionRef)
    const unsubscribe = onSnapshot(q, (querysnapshort) => {
        let data = querysnapshort.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()}))
        let favTodos = []
        let nonFavTodos = []
        data.map(todo => todo.favourite == true ? favTodos.push(todo) : nonFavTodos.push(todo))
        setFavTodos(favTodos)
        setNonFavTodos(nonFavTodos)
        setTodos(data)
    });
        // <pre>{JSON.stringify(todos,null,'\t')}</pre>
       
    
        return unsubscribe

},[])
    return(
        
       <div>
            {/* <pre>{JSON.stringify(todos,null,'\t')}</pre> */}
            {/* <pre> Fav :{JSON.stringify(favTodos,null,'\t')}</pre> */}
            {/* <pre>Non fav:{JSON.stringify(nonFavTodos,null,'\t')}</pre> */}
            <div>
            <h2>favourites</h2>

            {favTodos.map(todo => (<Todo key={todo.id}
            id={todo.id}
            title={todo.title}
            detail={todo.detail}
            timestamp={todo.timestamp}
            favourite={todo.favourite}
            />))}

            </div>


            <div>
            <h2>Non favourites</h2>

            {nonFavTodos.map(todo => (<Todo key={todo.id}
            id={todo.id}
            title={todo.title}
            detail={todo.detail}
            timestamp={todo.timestamp}
            favourite={todo.favourite}
            />))}

            </div>
            

            {/* {todos.map(todo => (<Todo key={todo.id}
            id={todo.id}
            title={todo.title}
            detail={todo.detail}
            timestamp={todo.timestamp}
            favourite={todo.favourite}
            />)) } */}
           
        </div>
    
    )

}
export default TodoList