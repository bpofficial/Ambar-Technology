import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Theme from './themes/';
import PageContainer from './Components/Presentational/Pages';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: createHttpLink({ uri: "http://localhost:8080/api" }),
    cache
});

export default class App extends React.Component {
    public render(): React.ReactElement {
        return (
            <Router>
                <ApolloProvider client={client}>
                    <MuiThemeProvider theme={Theme.one}>
                        <PageContainer />
                    </MuiThemeProvider>
                </ApolloProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'));
