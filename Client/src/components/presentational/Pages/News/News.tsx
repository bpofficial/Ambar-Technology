import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewsContent from "../../../functional/PAGE_NewsContent/NewsContent";

const useStyles = makeStyles({
    root: {

    }
});

export default function NewsContainer() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <NewsContent />
        </div>
    )
}