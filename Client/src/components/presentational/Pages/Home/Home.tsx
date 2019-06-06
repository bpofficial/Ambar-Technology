import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Carousel from "../../../functional/Carousel/Carousel";
import LandingContent from "../../../functional/PAGE_HomeContent/HomeContent";
import Sidebar from "../../../functional/Sidebar/Sidebar";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: 'auto'
    }
})

export default function HomeContent() {
    const classes = useStyles();
    return(
        <>
            <Carousel />
            <div className={classes.root} >
                <LandingContent />
                <Sidebar />
            </div>
        </>
    )
}