import  moment from "moment"
import { IconButton, ListItem, ListItemText, ToggleButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useState} from "react";
import { TodoContext } from "../pages/TodoContext";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { async } from "@firebase/util";
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore"

const Todo = ({ id, timestamp, title, detail, favourite }) => {
    const {showAlert, setTodo } = useContext(TodoContext)

    const deleteTodo = async (id,e)=>{
        e.stopPropagation();
        const docRef =doc(db,"todos",id);
        await deleteDoc(docRef);
        showAlert('error',`todo with id ${id} deleted sucessfuly`);
    }
    
    const [checked, setChecked] = useState(favourite);
    const handleChange =  (event) => {
      setChecked(event.target.checked);
      console.log(checked)
      const docRef = doc(db,"todos", id);
      const todoUpdated = {timestamp: serverTimestamp(), favourite:event.target.checked}
      updateDoc(docRef, todoUpdated)
      
    }
    
  
  //   return (
  //     <Switch
  //       checked={checked}
  //       onChange={handleChange}
  //       inputProps={{ 'aria-label': 'controlled' }}
  //     />
  //   );
  // }
    return (
        <ListItem 
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundcolor: "#FAFAFA"}}
            secondaryAction={
                <>
             <Switch id="switch" checked = {checked}   
             onChange = {handleChange}
             inputProps ={{ 'arial-label': 'controlled'}} />

                <IconButton onClick = {e=>deleteTodo(id, e)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon onClick={() => setTodo({ id, title, detail, timestamp})}/>
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