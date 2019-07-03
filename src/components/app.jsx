import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header';
import HeaderTwo from './common/headers/header';
import HeaderThree from './common/headers/header';

import FooterOne from "./common/footers/footer";
import FooterTwo from "./common/footers/footer";
import FooterThree from "./common/footers/footer";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"



class App extends Component {

    render() {

        return (
            <div>
                <HeaderOne logoName={'logo.png'}/>
                {this.props.children}
                <FooterOne logoName={'logo.png'}/>

                {/*<ThemeSettings />*/}

            </div>
        );
    }
}

export default withTranslate(App);
