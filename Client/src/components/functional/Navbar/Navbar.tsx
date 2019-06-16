import * as React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles( theme => ({
    root: {
        backgroundColor: 'red',
        display: 'flex',
        padding: '0.5em',
        justifyContent: 'flex-end'
    },
    button: {
        display: 'flex',
        flex: 1,
        padding: '1.5em',
        marginRight: '1em'
    },
    search: {
        padding: '1.5em',
        width: '20%'
    },
    link: {
        color: 'inherit', 
        textDecoration: 'inherit'
    }
}));

const mobileNav = ( classes: any ) => {
    return( 
        <div className={classes.root} >
            
        </div>
    )
}

const defaultNav = ( classes: any ) => {
    return (
        <div className={classes.root} >
            <Link to="/" className={classes.link}>
                <button className={classes.button} >
                    Home
                </button>
            </Link>
            <Link to="/news" className={classes.link}>
                <button className={classes.button} >
                    News
                </button>
            </Link>
            <Link to="/shop" className={classes.link}>
                <button className={classes.button} >
                    Wholesale
                </button>
            </Link>
            <Link to="/account" className={classes.link}>
                <button className={classes.button} >
                    Account
                </button>
            </Link>
            <input className={classes.search} /> 
        </div>   
    )
}

export default function NavBar() {
    //const theme = useTheme();
    const classes = useStyles({});
    const media = {
        mobile: {
            portrait: useMediaQuery('only screen and (min-width: 320px) and (max-width: 767px) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and (min-width: 320px) and (max-width: 767px) and ( orientation: landscape )')
        },
        tablet: {
            portrait: useMediaQuery('only screen and ( min-width: 768px ) and ( max-width: 1199px ) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and ( min-width: 768px ) and ( max-width: 1199px ) and ( orientation: landscape )')
        },
        desktop: {
            portrait: useMediaQuery('only screen and ( min-width: 1200px ) and ( orientation: portrait )'),
            landscape: useMediaQuery('only screen and ( min-width: 1200px ) and ( orientation: landscape )')
        }
    }
    return(
        <>
            { !( media.desktop.portrait || media.desktop.landscape || media.tablet.landscape ) && mobileNav( classes ) }
            {  ( media.desktop.portrait || media.desktop.landscape || media.tablet.landscape ) && defaultNav( classes ) }
        </>
    )
}