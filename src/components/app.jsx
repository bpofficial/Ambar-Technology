import React, {Component} from 'react';

// Custom Components
import Header from './common/headers/header';
import Footer from "./common/footers/footer";

export default class App extends Component {

    render() {

        return (
            <div>
                <Header logoName={'logo.png'}/>
                {this.props.children}
                <Footer logoName={'logo.png'}/>
            </div>
        );
    }
}

