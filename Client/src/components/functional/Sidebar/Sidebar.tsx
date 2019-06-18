import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { gql } from "apollo-boost";
import { Query, QueryResult } from "react-apollo";

// Component Styles
const useStyles = makeStyles({
    link: {
        color: 'inherit',
        textDecoration: 'inherit'
    },
    listText: {
        margin: '0px'
    }
})

export default () => {
    const classes = useStyles({});
    return (
        // Query (wrapper) component which displays information based on the GraphQL query: 'categories'
        // This query returns an array of categories (strings) from a 'distinct' mongoose query on all products.
        // Apollo cache causes the query to hit local cache and won't make a new HTTP request.
        <Query query={gql`{ productCategories }`} errorPolicy="all" >
            {({ loading, error, data }: QueryResult) => {
                return (
                    <div>
                        {loading && !(data || error == undefined) &&
                            <ListItem>
                                <ListItemText primary="Loading categories." />
                            </ListItem>
                        }{(!!JSON.stringify(error) || !!error || !data || !('productCategories' in data)) &&
                            <ListItem>
                                <ListItemText primary="Unable to retrieve categories." />
                            </ListItem>
                        }{data && 'productCategories' in data && !(loading && error == undefined)
                            && data.productCategories.sort((a: string, b: string) => {
                                return a.toLowerCase().localeCompare(b.toLowerCase());
                            }).map((category: string, index: number) => {
                                return (
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
                    </div>
                )
            }}
        </Query>
    )
}