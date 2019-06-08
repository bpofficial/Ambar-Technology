import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

// Component Styles
const useStyles = makeStyles({
    root: {
        flex: 0.3,
        height: 'fit-content'
    },
    container: {
        padding: '2em'
    },
    link: {
        color: 'inherit', 
        textDecoration: 'inherit'
    },
    listText: {
        margin: '0px'
    }
})

export default function Sidebar() {
    const classes = useStyles();
    return(
        // Query (wrapper) component which displays information based on the GraphQL query: 'categories'
        // This query returns an array of categories (strings) from a 'distinct' mongoose query on all products.
        // Apollo cache causes the query to hit local cache and won't make a new HTTP request.
        <Query query={gql`{ productCategories }`} errorPolicy="all" >
            {({ loading, error, data }: any ) => {
                return (
                    <Paper className={classes.root} >
                        <div className={classes.container}>
                            <Typography variant="h5" gutterBottom>
                                Product Categories
                            </Typography>
                            <List dense>
                                <ListItem divider/>
                                { loading && <ListItem><ListItemText primary="Loading categories."/></ListItem> }
                                { error || 'productCategories' !in data || !(data || loading) && <ListItem><ListItemText primary="Unable to retrieve categories."/></ListItem>}
                                { data && 'productCategories' in data && !loading && !error 
                                    && data.productCategories.sort( ( a: string, b: string ) => {
                                        return a.toLowerCase().localeCompare(b.toLowerCase());
                                    }).map( ( category: string, index: number ) => {
                                        return(
                                            <Link 
                                                key={index}
                                                className={classes.link} 
                                                to={{ 
                                                    pathname: '/shop', 
                                                    state: {
                                                        search: `${category}`
                                                    } 
                                                }} 
                                            >
                                                <ListItem button divider>
                                                    <ListItemText 
                                                        className={classes.listText}
                                                        primary={<Typography variant="body1">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>}
                                                    />
                                                </ListItem>
                                            </Link>
                                        )
                                    })
                                }
                            </List>
                        </div>
                    </Paper>
                )
            }}
        </Query>
    )
}