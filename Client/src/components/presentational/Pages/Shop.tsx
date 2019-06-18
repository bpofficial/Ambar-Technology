import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Products from "../../Functional/Cards/Products";

const useStyles = makeStyles({
    root: {
        display: 'block',
        padding: '1em'
    },
    container: {
        display: 'flex',
        flex: 1,
        flexFlow: 'column wrap'
    },
    promoContainer: {
        flex: 1,
        backgroundColor: 'red',
        minHeight: '5vh'
    }
})

export default function ShopContent(props: any) {
    const classes = useStyles({});
    let template;
    console.log(props)
    if (props !== undefined && 'location' in props) {
        if ('state' in props.location && props.location.state !== undefined) {
            template =
                'product' in props.location.state ?
                    <Products item={props.location.state.product} /> :
                    'search' in props.location.state && props.location.state.search.length > 0 ?
                        <Products search={props.location.state.search} /> :
                        <Products default />
        } else if ('pathname' in props.location && props.location.pathname !== '/shop') {
            template = <Products info={props.location.pathname.split("/")[2]} />
        } else {
            template = <Products default />
        }
    } else {
        template = <Products default />
    }
    return (
        <div className={classes.root}>
            <div className={classes.container} >
                {/* Current top sellers or promos */}
                <div className={classes.promoContainer}>
                    Current top sellers, maybe look at monthly highs and show these. E.g. May's Best sellers!<br />
                    Could also do promos. Make editable in admin panel when there is one :)
                </div><br />
                {/* Shop item cards (default: category cards) */}
                {template}
            </div>
        </div>
    )
}