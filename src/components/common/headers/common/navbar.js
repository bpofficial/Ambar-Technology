import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'smartmenus';

export default () => {

    const [navState, setNavState] = useState({right: '0px'})

    $(function() {
        $('#main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8
        });
    });
    if (window.innerWidth < 750) {
        setNavState({ right:'-410px' })
    }
    if (window.innerWidth < 1199) {
        setNavState({ right:'-300px' })
    }

    const openNav = () =>  {
        setNavState({ right:'0px' })
    }

    const closeNav = () =>  {
        setNavState({ right:'-410px' })
    }

    const onMouseEnterHandler = () => {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    return (
        <div>
            <nav id="main-nav">
                <div className="toggle-nav" onClick={openNav.bind(this)}>
                    <i className="fa fa-bars sidebar-bar" ></i>
                </div>
                <ul id="main-menu" className="sm pixelstrap sm-horizontal" style={navState}>
                    <li >
                        <div className="mobile-back text-right" onClick={closeNav.bind(this)}>
                            Back
                            <i className="fa fa-angle-right pl-2" aria-hidden="true" />
                        </div>
                    </li>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a  style={{paddingRight:'75px'}} href="/store">Store</a>
                        <ul>
                            {/* TODO: Complete this => Category collection */}
                            <li><Link to={`${process.env.PUBLIC_URL}/store`} >{'Category 1'}</Link></li>
                        </ul>
                    </li>
                    <li >
                        <a href="/blog">Blog</a>
                    </li>
                    <li />
                    <li >
                        <a href="/about">About Us</a>
                    </li>
                    <li >
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}