import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
        height: '60vh',
        backgroundColor: 'lightgray',
        padding: '1em'
    }
})

export default function Carousel(props: any, state: any) {
    const classes = useStyles({});
    return (
        <Paper elevation={1} className={classes.root} >
            Carousel
        </Paper>
    )
}