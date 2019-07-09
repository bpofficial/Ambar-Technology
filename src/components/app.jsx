import React from 'react';

// Custom Components
import Header from './common/headers/header';
import Footer from "./common/footers/footer";

export default ({ children }) => { 
    return (
        <div>
            <Header logoName={'1'} />
            { children }
            <Footer logoName={'1'} />
        </div>
    )
}

