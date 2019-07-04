import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { PAGE_CONSTANTS } from "../../../../constants/root"

export default class TopBarWhite extends Component {

    render() {
        return (
            <div>
                <div className={`top-header ${'shade' in this.props ? this.props.shade == 'light' ? "white-bg border-bottom-grey" : this.props.shade == 'dark' ? "top-header-dark3" : "": ""}`}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="header-contact">
                                    <ul>
                                        <li>{PAGE_CONSTANTS.title}</li>
                                        <li>
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                            Call us:  {PAGE_CONSTANTS.phone}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 text-right">
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist"></li>
                                    <li className="onhover-dropdown mobile-account">
                                        <i className="fa fa-user" aria-hidden="true"></i> My Account
                                        <ul className="onhover-show-div">
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/login`} data-lng="en">Login</Link>
                                            </li>
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">Register</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}