import React from 'react';
import {Link} from 'react-router-dom'

function LogoImage(props) {

    return (
        <Link to={`${process.env.PUBLIC_URL}/`} >
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/logo/${props.logo}.png`} alt="" className="img-fluid" />
        </Link>
    );
}

export default LogoImage;