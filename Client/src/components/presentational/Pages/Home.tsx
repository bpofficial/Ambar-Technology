import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Carousel from "../../Functional/Carousel/Carousel";
import Sidebar from "../Sidebar/Sidebar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
        display: 'block',
        padding: '1em'
    },
    container: {
        display: 'flex',
        flex: 1
    },
    content: {
        flex: 0.7,
        backgroundColor: 'inherit',
        padding: '1em'
    },
    title: {
        color: '#ebc200' //'#ffd200'
    },
    paper: {
        marginTop: '1em'
    },
    containerTwo: {
        padding: '1em'
    }
})

export default function HomeContent() {
    const classes = useStyles({});
    return (
        <div className={classes.root}>
            <Carousel /><br />
            <div className={classes.container} >
                <div className={classes.content} >
                    <Typography variant="h3" align="center" className={classes.title}>
                        Ambar Technology
                    </Typography><br />
                    <Typography variant="body1">
                        Ambar Technology is a wholesale brewing-equipment supplier for the Australian home-brew and commercial brewing industry.
                    </Typography><br />
                    <Typography variant="body1">
                        If you would like to register your business and receive access to all pricing and easy ordering <a>click here</a>.
                        <br /><br />
                        Should you wish to phone in an order or need any further assistance please email us at <a href="mailto:info@ambartechnology.com.au">info@ambartechnology.com.au</a>
                        <br /><br />
                        Please note all prices shown are subject to GST.
                    </Typography><br />
                    <Paper elevation={0} className={classes.paper}>
                        <div className={classes.containerTwo}>
                            <Typography variant="h6">
                                Satisfaction Guaranteed!
                            </Typography>
                            <Typography variant="body1">
                                All of our products are tested by us for suitability and must pass our high-quality standards before being offered for sale.
                            </Typography><br />
                            <Typography variant="h6">
                                Our Promise
                            </Typography>
                            <Typography>
                                If the product is defective in any way or does not live up to our claims we will exchange or refund the purchase amount.
                            </Typography>
                        </div>
                    </Paper>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}