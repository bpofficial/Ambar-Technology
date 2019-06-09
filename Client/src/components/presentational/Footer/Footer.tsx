import * as React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        height: '5%',
        backgroundColor: 'red',
        position: 'absolute',
        bottom: '0',
        width: '100%'
    }
})

export default function Footer() {
    const classes = useStyles({});
    return(
        <div className={ classes.root } >
            Footer
        </div>
    )
}