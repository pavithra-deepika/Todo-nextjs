import  moment from "moment"
import { ListItem, ListItemText } from "@mui/material"

const Todo = ({ id, timestamp, title, detail }) => {
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundcolor: "#FAFAFA"}}
        >
            <ListItemText
            primary={title}
            secondary={moment(timestamp).format("MMMM,do,yyyy")}
            />
        </ListItem>
    )
}
export default Todo