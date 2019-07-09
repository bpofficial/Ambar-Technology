import React, {Component } from 'react';
import {Helmet } from 'react-helmet'
import '../common/index.scss';
import Slider from 'react-slick';

// Import custom components
import Header from "../common/headers/header"
import Footer from "../common/footers/footer";

class Products extends Component {
    render(){

        return (
            <div className="container-fluid layout-8">
                <Helmet>
                    <title>Ambar Technology</title>
                </Helmet>
                <Header logoName={'1'} />
                <section className="p-0 padding-bottom-cls">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home15">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>$10 July</h4>
                                                    <h1>shipping</h1>
                                                    <a href="/store" className="btn btn-outline btn-classic">shop now</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home16">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>free per $50 spent</h4>
                                                    <h1>5-in-1 wrench</h1>
                                                    <a href="/store" className="btn btn-outline btn-classic">shop now</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                <div className="layout-8-bg">
                    {/*About Section*/}
                    <section className="banner-goggles ratio2_3">
                        <div className="container-fluid">
                            <div className="row partition3">
                                <div className="col-md-4">
                                    <a href="/">
                                        <div className="collection-banner">
                                            <div className="img-part">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/electronics/sub1.jpg`}
                                                     className="img-fluid blur-up lazyload bg-img" alt="" />
                                            </div>
                                            <div className="contain-banner banner-3">
                                                <div>
                                                    <h4>10% off</h4>
                                                    <h2>speaker</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="/">
                                        <div className="collection-banner">
                                            <div className="img-part">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/electronics/sub2.jpg`}
                                                     className="img-fluid blur-up lazyload bg-img" alt="" />
                                            </div>
                                            <div className="contain-banner banner-3">
                                                <div>
                                                    <h4>10% off</h4>
                                                    <h2>earplug</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="/">
                                        <div className="collection-banner">
                                            <div className="img-part">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/electronics/sub3.jpg`}
                                                     className="img-fluid blur-up lazyload bg-img" alt="" />
                                            </div>
                                            <div className="contain-banner banner-3">
                                                <div>
                                                    <h4>50% off</h4>
                                                    <h2>best deal</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*About Section End*/}

                    {/*Product slider <SpecialProducts type={'electronics'} />*/}
                    {/*Product slider End*/}
                </div>
                <div className="footer-white">
                    <Footer logoName={'logo/3.png'} />
                </div>
            </div>
        )
    }
}


export default Products;