import * as React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {

    }
});

export default function ShopContainer() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            Shop
        </div>
    )
}