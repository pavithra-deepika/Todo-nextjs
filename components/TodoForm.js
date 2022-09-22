import{Button, TextField} from "@mui/material"
const TodoForm = () => {
    return (
        <div>
            <TextField fulWidth label="title" margin="normal"/>
            <TextField fullWidth label="detail" multiline maxRows={4}/>
            <Button sx={ {mt:3}}>Add anew todo </Button>


        </div>

    )
}
export default TodoForm
