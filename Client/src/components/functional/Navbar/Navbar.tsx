import * as React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles( theme => ({
    root: {
        width: '100%',
        backgroundColor: 'red',
        height: '11vh'
    },
    container: {
        display: 'flex',
        padding: '0.5em',
        justifyContent: 'flex-end'
    },
    button: {
        padding: '1.5em',
        marginRight: '1em'
    },
    search: {
        padding: '1.5em',
        width: '20%'
    }
}));

export default function NavBar() {
    //const theme = useTheme();
    const classes = useStyles();
    return(
        <div className={classes.root} >
            <div className={classes.container} >
                {/* TODO: MAKE BUTTONS RESPONSIVE TO SIZE CHANGES */}
                {/* TODO: MAKE NAVBAR CHANGE WITH SIZE CHANGES*/}
                <Link to="/">
                    <button className={classes.button} >
                        Home
                    </button>
                </Link>
                <Link to="/news">
                    <button className={classes.button} >
                        News
                    </button>
                </Link>
                <Link to="/shop">
                    <button className={classes.button} >
                        Wholesale
                    </button>
                </Link>
                <Link to="/account">
                    <button className={classes.button} >
                        Account
                    </button>
                </Link>
                <input className={classes.search} />
            </div>
        </div>
    )
}