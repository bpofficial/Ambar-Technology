import * as React from 'react';
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { useMediaQuery } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Navbar from "../../Functional/Navbar/Navbar";
import Home from "./Home";
import News from "./News";
import Shop from "./Shop";
//import Footer from "../Footer/Footer";

const containerStyles = makeStyles(theme => {
    return {
        root: {
            display: 'flex',
            backgroundColor: '#ffea85',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'auto'
        },
        container: {
            backgroundColor: theme.palette.secondary.light,
            display: 'flex',
            position: 'relative',
            flexFlow: 'column wrap'
        },
        padder: {
            flex: 0.125
        },
        info: {
            display: 'flex',
            height: 'auto'
        }
    }
});

export default function PageContainer() {
    const theme = useTheme();
    const media = {
        mobile: {
            portrait: useMediaQuery('only screen and ( max-width: 600px ) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and ( mxn-width: 600px ) and ( orientation: landscape )')
        },
        tablet: {
            portrait: useMediaQuery('only screen and ( min-width: 601px ) and ( max-width: 1199px ) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and ( min-width: 601px ) and ( max-width: 1199px ) and ( orientation: landscape )')
        },
        desktop: {
            portrait: useMediaQuery('only screen and ( min-width: 1200px ) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and ( min-width: 1200px ) and ( orientation: landscape )')
        }
    }
    const classes = containerStyles({ theme, media });
    return (
        <div className={classes.root} >
            {   // Show side padding only if the device is a desktop in landscape mode.
                media.desktop.landscape && <div className={classes.padder} />
            }

            { /* If the device isn't landscape-desktop view, use full-flex (100% / 1), otherwise use 75% / 0.75. */}
            <Paper elevation={1} className={classes.container} style={{ flex: !media.desktop.landscape ? 1 : 0.75 }}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/news" component={News} />
                    <Route path="/shop" component={Shop} />
                    <Route path="/account" component={Home} />
                </Switch>
                <br /><br /><br /><br /><br /><br />
                {/*<Footer />*/}
            </Paper>
            {   // Show side padding only if the device is a desktop in landscape mode.
                media.desktop.landscape && <div className={classes.padder} />
            }
        </div>
    )
}