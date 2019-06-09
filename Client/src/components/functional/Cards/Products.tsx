import * as React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Product from "../../Presentational/Pages/Product";

const useStyles = makeStyles({
    itemsContainer: {
        flex: 1,
        //backgroundColor: 'lightgray'
    },
    sortingContainer: {
        flex: 1,
        backgroundColor: 'purple',
        minHeight: '5vh'
    },
    itemGrid: {
        padding: '1em'
    },
    card: {},
    link: {
        color: 'inherit', 
        textDecoration: 'inherit',
        width: '100%'
    }
})

export default function Products( props: any, state: any ) {
    const classes = useStyles({});
    const PRODUCT_ATTRIBS = 'id, name, details, short, sku, stock, price';
    let query: any;
    if ( props.default ) {
        query = gql` { productCategories }`
    } else if ( props.search) {
        query = gql` { products( search:"${props.search}" ) { ${PRODUCT_ATTRIBS} } }`
    } else if ( props.item ) {
        return (
            <Product details={props.item} />
        )
    } else if ( props.info && !props.itemId ) {
        query = gql` { products( search:"${props.info}" ) { ${PRODUCT_ATTRIBS} } }`
    } else {
        query = gql` { productCategories }`
    }

    return (
        <Query query={query} errorPolicy="all">
            {({ loading, error, data }: any ) => {
                if ( props.default && data && !(error || loading) ) {
                    data = data.productCategories.sort(( a: string, b: string ) => {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });
                } else if ( data && !(error || loading || props.default) ) {
                    data = data.products;
                }
                return (
                    <>
                        <div className={classes.sortingContainer}>
                            <button>
                                Sort by... (dropdown)
                            </button>
                            <input placeholder="search for shit"/>
                        </div><br />
                        <div className={classes.itemsContainer}>
                            <Grid container justify="center" spacing={8} className={classes.itemGrid}>
                            { loading && <div>Loading products.</div> }
                            { error && !(data || loading) && <div>Unable to retrieve products.</div> }
                            { data && !(loading || error) && data.map( ( product: any, index: number ) => {
                                let name = !props.default ? product.name : product
                                let state = typeof product !== 'string' && 'id' in product ? { state: { product: product } } : {}
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" align="center" component="h2">
                                                    {name}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link 
                                                    className={classes.link}
                                                    to={{
                                                        pathname: `/shop/${name.replace(" ", "-").replace(" ","-")}`,
                                                        ...state
                                                    }}
                                                >
                                                    <Button size="small" color="secondary" style={{width:'100%'}}>
                                                        Shop now
                                                    </Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                            </Grid>
                        </div>
                    </>
                )
            }}
        </Query>
    )
}