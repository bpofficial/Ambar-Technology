import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SlideUpDown } from "../../../services/script"
import LogoImage from "../headers/common/logo"
import { PAGE_CONSTANTS } from "../../../constants/root"
import Subscribe from "../../features/subscribe"

export default () => { 

    var contentwidth = window.innerWidth;
    if ((contentwidth) < 750) { 
        SlideUpDown('footer-title');
    } else { 
        var elems = document.querySelectorAll(".footer-title");
        [].forEach.call(elems, function(elemt) { 
            let el = elemt.nextElementSibling;
            el.style = "display: block";
        });
    }

    return (
        <footer className="footer-light">
            <div className="light-layout">
                <div className="container">
                    <section className="small-section border-section border-top-0">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="subscribe">
                                    <div>
                                        <h4>KNOW IT ALL FIRST!</h4>
                                        <p>never miss anything by signing up to our newsletter</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Subscribe mailchimp/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <section className="section-b-space light-layout">
                <div className="container">
                    <div className="row footer-theme partition-f">
                        <div className="col offset-xl-1">
                            { /* Is the user logged in? Yes, show this, otherwise don't. */}
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4>my account</h4>
                                </div>
                                <div className="footer-content">
                                    <ul>
                                        <li><Link to={`${process.env.PUBLIC_URL}/store`} >Cart</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/store`} >Orders</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/store`} >Settings</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4>Helpful Links</h4>
                                </div>
                                <div className="footer-content">
                                    <ul>
                                        <li><a href="/">Store</a></li>
                                        <li><a href="/">Policies</a></li>
                                        <li><a href="/">Delivery &amp; Pickup</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4>store information</h4>
                                </div>
                                <div className="footer-content">
                                    <ul className="contact-list">
                                        <li>
                                            <i className="fa fa-phone" />
                                            Call Us:
                                            <a href={`tel:${PAGE_CONSTANTS.phone.replace(" ","")}`} style={{textTransform: 'none'}}> { PAGE_CONSTANTS.phone}</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope-o" />
                                            Email Us: 
                                            <a href="mailto:info@ambartechnology.com.au" style={{textTransform: 'none'}}> info@ambartechnology.com.au</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}