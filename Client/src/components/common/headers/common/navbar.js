import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import $ from 'jquery';
import 'smartmenus';

const NavBar = ({ categories }) => {
    const [navState, setNavState] = useState({ right: '0px' })
    const [innerWidthState, _] = useState(innerWidthState !== window.innerWidth ? window.innerWidth : innerWidthState)

    $(function () {
        $('#main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8
        });
    });

    if (innerWidthState < 750) {
        setNavState({ right: '-410px' })
    }
    
    if (innerWidthState < 1199) {
        setNavState({ right: '-300px' })
    }

    const openNav = () => {
        setNavState({ right: '0px' })
    }

    const closeNav = () => {
        setNavState({ right: '-410px' })
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
                        <a style={{ paddingRight: '75px' }} href="/store">Store</a>
                        <ul>
                            { /* TODO: Complete this => Category collection */}
                            {categories.length < 1 ? <div className="loading-cls"></div> : categories.map((name, i) => {
                                return <li key={i}><Link to={`${process.env.PUBLIC_URL}/store/${name.toLowerCase()}`} >{name}</Link></li>
                            })}
                        </ul>
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

const mapStateToProps = state => ({
    categories: state.data.categories
})

export default connect(
    mapStateToProps
)(NavBar);