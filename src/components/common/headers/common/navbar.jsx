import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'smartmenus';

export default class NavBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            navClose:{right:'0px'}
        }
    }

    componentWillMount (){
        $(function() {
            $('#main-menu').smartmenus({
                subMenusSubOffsetX: 1,
                subMenusSubOffsetY: -8
            });
        });
        if (window.innerWidth < 750) {
            this.setState({navClose: {right:'-410px'}})
        }
        if (window.innerWidth < 1199)
        {
            this.setState({navClose: {right:'-300px'}})
        }
    }

    openNav() {
        this.setState({navClose: {right:'0px'}})
    }

    closeNav() {
        this.setState({navClose: {right:'-410px'}})
    }

    onMouseEnterHandler() {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    render() {
        return (
            <div>
                <nav id="main-nav">
                    <div className="toggle-nav" onClick={this.openNav.bind(this)}>
                        <i className="fa fa-bars sidebar-bar" ></i>
                    </div>
                    {/*Horizontal menu TODO: Fix menu disappearing after zoom*/}
                    <ul id="main-menu" className="sm pixelstrap sm-horizontal" style={this.state.navClose}>
                        <li >
                            <div className="mobile-back text-right" onClick={this.closeNav.bind(this)}>
                                Back<i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                            </div>
                        </li>
                        <li >
                            <a href="/store">Shop</a>
                            <ul>
                                {//TODO: Complete this => Category collection
                                }
                                <li><Link to={`${process.env.PUBLIC_URL}/store`} >{'Category 1'}</Link></li>
                                <a />
                            </ul>
                        </li>
                        <li >
                            <a href="/blog">Blog</a>
                            <ul>
                                {/*
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/blog-page`} >Blog</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/left-sidebar`}>Blog</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/details`} >Details</Link></li>
                                */}
                            <a />
                            </ul>
                        </li>
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
}