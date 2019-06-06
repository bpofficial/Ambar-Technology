import * as React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        flex: 0.3,
        backgroundColor: 'green'
    }
})

export default function Sidebar( props: any, state: any ) {
    const classes = useStyles();
    return(
        <div className={classes.root} >
            Sidebar
        </div>
    )
}