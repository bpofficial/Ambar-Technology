import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%',
        minHeight: '60vh'
    },
    container: {
        display: 'flex',
        height: '100%'
    },
    image: {
        flex: 0.5,
        padding: '1em'
    },
    details: {
        flex: 0.5,
        padding: '2em',
        height: '100%'
    },
    title: {
        flex: 1,
        width: '100%',
        display: 'inline-flex'
    },
    name: {}
})

export default function Product( props: any ) {
    if( !props || !props.details ) {
        // 404?? Or redirect back to shop?
    }
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Paper className={classes.container}>
                <Grid container>
                    <Grid className={classes.image} item xs={12} sm={12} md={6} lg={6}>
                        Image
                    </Grid>
                    <Grid className={classes.details} item xs={12} sm={12} md={6} lg={6}>
                        <Grid container className={classes.title}>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Typography variant="h5" align="left" gutterBottom className={classes.name}>
                                    {props.details.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} >
                                <Typography variant="subtitle1" align="left" gutterBottom className={classes.name}>
                                    {props.details.price}    
                                </Typography>
                            </Grid>
                        </Grid><br/>
                        <Typography variant="body1" align="left" gutterBottom>
                            {props.details.details}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}