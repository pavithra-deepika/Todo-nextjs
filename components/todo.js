import  moment from "moment"
import { IconButton, ListItem, ListItemText } from "@mui/material"
import { Delete } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { TodoContext } from "../pages/TodoContext";

const Todo = ({ id, timestamp, title, detail }) => {
    const {showAlert,  setTodo } = useContext(TodoContext)

    const deleteTodo = async (id,e)=>{
        const docRef = doc(db, "todos", id);
        const todoUpdated = { timestamp: serverTimestamp(), status : false}
        updateDoc(docRef, todoUpdated)
        // setTodo({ title: '', detail: ''});
        // e.stopPropagation();
        // const docRef =doc(db,"todos",id);
        // await deleteDoc(docRef);
        showAlert('error',`todo with id ${id} deleted sucessfuly`);
    }
    return (
        <ListItem onClick={() => setTodo({ id, title, detail, timestamp})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundcolor: "#FAFAFA"}}
            secondaryAction={
                <>
                <IconButton onClick = {e=>deleteTodo(id, e)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>

                </>
            }
        >
            <ListItemText
            primary={title}
            secondary={moment(timestamp).format("MMMM,do,yyyy")}
            />
        </ListItem>
    )

}
export default Todo