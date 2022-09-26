import { async } from "@firebase/util"
import{Button, TextField} from "@mui/material"
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import {db} from "../firebase"
import { collection, doc, setDoc, orderBy, onSnapshot,query} from "@firebase/firestore"; 
import { TodoContext } from "../pages/TodoContext"


const TodoForm = () => {
    const inputAreaRef =useRef();
    // <pre>{JSON.stringify(todo,null,'\t')}</pre>

    const {showAlert, todo, setTodo} = useContext(TodoContext)
    const onSubmit = async () => {
        if (todo?.hasOwnProperty('timestamp')){
            //update the todo 
            const docRef = doc(db, "todos", todo.id);
            const todoUpdated = { ...todo, timestamp: serverTimestamp()}
            updateDoc(docRef, todoUpdated)
            setTodo({ title: '', detail: ''});
            showAlert('info', `Todo with id ${todo.id} updated sucessfully`)
        } else {
            const collectionRef = collection(db, "todos")
            const docRef =await addDoc(collectionRef,{...todo, timestamp:serverTimestamp() })
            setTodo({ title:'',detail:''})
            showAlert ('success',`Todo with id ${docRef.id} is added sucessfully`)

        }
        }  
    useEffect(() => {
        const checkIfclickedOutside = e => {
        if(!inputAreaRef.current.contains(e.target)){
            console.log('Outside input area');
            setTodo({title: '', detail: ''})
        } else {
            console.log('Inside input area');
        }
    }
    document.addEventListener("mousedown", checkIfclickedOutside)
    return () => {
        document.removeEventListener("mousedown", checkIfclickedOutside)
    }
    }, [])
    return (
        <div ref={inputAreaRef}>
            <TextField fullWidth label="title" margin="normal"
            value={todo.title}
            onChange={e => setTodo({ ...todo, title: e.target.value})}
            />
            <TextField fullWidth label="detail" multiline maxRows={4}
             value={todo.detail}
             onChange={e => setTodo({ ...todo, detail: e.target.value})}
             />
            <Button onClick={onSubmit}  variant="contained" sx={ {mt:3 }}>{todo.hasOwnProperty('timestamp')?'Update todo': "Add a new todo "}</Button>

        </div>

    )
}
export default TodoForm
