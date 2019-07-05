import React, {Component} from 'react';
import { Link} from 'react-router-dom';

import {SlideUpDown} from "../../../services/script"
import LogoImage from "../headers/common/logo"

class FooterOne extends Component {

    componentDidMount(){
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
    }


    render () {

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
                                    <form className="form-inline subscribe-form" action="https://ambartechnology.us14.list-manage.com/subscribe/post?u=16f8118cd33ed525ba2440a1d&amp;id=c7cb5718c6" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
                                        <div className="form-group mx-sm-3">
                                        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
                                            <div id="mc_embed_signup">
                                                <input type="text" name="EMAIL" className="form-control" id="mce-EMAIL" placeholder="Enter your email" />
                                                <div id="mce-responses" className="clear">
                                                    <div className="response" id="mce-error-response" style={{display: "none"}} />
                                                    <div className="response" id="mce-success-response" style={{display: "none"}} />
                                                    <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                                                        <input type="text" name="b_16f8118cd33ed525ba2440a1d_c7cb5718c6" tabIndex="-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" id="mc-embedded-subscribe" value="Subscribe" name="subscribe" className="btn btn-solid">subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row footer-theme partition-f">
                            <div className="col offset-xl-1">
                                {/* Is the user logged in? Yes, show this, otherwise don't. */}
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>my account</h4>
                                    </div>
                                    <div className="footer-contant">
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
                                    <div className="footer-contant">
                                        <ul>
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">Policies</a></li>
                                            <li><a href="#">Delivery &amp; Pickup</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>store information</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-phone"></i>Call Us: {/* TODO: global constants: phone number */'+61 437 932 890'}</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="#">info@ambartechnology.com.au</a></li>
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
}

export default FooterOne;