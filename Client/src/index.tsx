import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Theme from './themes/';
import PageContainer from './components/presentational/PageContainer/PageContainer';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

export default class App extends React.Component {
    public render(): React.ReactElement {
        return(
            <MuiThemeProvider theme = { Theme.one }>
                <PageContainer />
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render( <App />, document.getElementById('root') );
