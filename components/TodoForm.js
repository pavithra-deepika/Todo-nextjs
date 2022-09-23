import { async } from "@firebase/util"
import{Button, TextField} from "@mui/material"
import { addDoc, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import {db} from "../firebase"
import { collection, doc, setDoc, orderBy, onSnapshot,query} from "@firebase/firestore"; 


const TodoForm = () => {
    const [todo, setTodo] =useState({ title:"", detail:""})
    const onSubmit = async () => {
        const collectionRef = collection(db, "todos")
        const docRef =await addDoc(collectionRef,{...todo, timestamp:serverTimestamp() })
        setTodo({ title:'',detail:''})
        alert (`Todo with id ${docRef.id} is added sucessfully`)
    }
    return (
        <div>
            <TextField fulWidth label="title" margin="normal"
            value={todo.title}
            onChange={e => setTodo({ ...todo, title: e.target.value})}
            />
            <TextField fullWidth label="detail" multiline maxRows={4}
             value={todo.detail}
             onChange={e => setTodo({ ...todo, detail: e.target.value})}
             />
            <Button onClick={onSubmit}  variant="contained" sx={ {mt:3}}>Add anew todo </Button>

        </div>

    )
}
export default TodoForm
