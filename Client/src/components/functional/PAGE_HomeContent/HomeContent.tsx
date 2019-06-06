import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flex: 0.7,
        backgroundColor: 'purple',
    }
})

export default function LandingContent( props: any, state: any ) {
    const classes = useStyles();
    return(
        <div className={classes.root} >
            Landing page content.
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}