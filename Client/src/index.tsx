import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Theme from './themes/';
import PageContainer from './components/presentational/PageContainer/PageContainer';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

export default class App extends React.Component {
    public render(): React.ReactElement {
        return(
            <Router>
                <MuiThemeProvider theme = { Theme.one }>
                    <PageContainer />
                </MuiThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render( <App />, document.getElementById('app-root') );
