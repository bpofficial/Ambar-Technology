import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SidebarContent from "../../Functional/Sidebar/Sidebar";

const useStyles = makeStyles({
    root: {
        flex: 0.3,
        height: 'fit-content'
    },
    container: {
        padding: '2em'
    }
})

export default function PSidebar() {
    const classes = useStyles({});
    console.log('has been mounted')
    return (
        <Paper className={classes.root} >
            <div className={classes.container}>
                <Typography variant="h5" gutterBottom>
                    Product Categories
                </Typography>
                <List dense>
                    <ListItem divider />
                    <SidebarContent />
                </List>
            </div>
        </Paper>
    )
}