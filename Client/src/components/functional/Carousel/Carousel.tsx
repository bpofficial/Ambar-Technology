import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        height: '60vh',
        backgroundColor: 'blue',
    }
})

export default function Carousel( props: any, state: any ) {
    const classes = useStyles();
    return(
        <div className={classes.root} >
            Carousel
        </div>
    )
}