import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'smartmenus';
import { withTranslate } from 'react-redux-multilingual'

class NavBar extends Component {
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
        const {translate} = this.props;
        return (
            <div>
                <nav id="main-nav">
                    <div className="toggle-nav" onClick={this.openNav.bind(this)}>
                        <i className="fa fa-bars sidebar-bar" ></i>
                    </div>
                    {/*Horizontal menu*/}
                    <ul id="main-menu" className="sm pixelstrap sm-horizontal" style={this.state.navClose}>
                        <li >
                            <div className="mobile-back text-right" onClick={this.closeNav.bind(this)}>
                                Back<i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                            </div>
                        </li>
                        <li ><a href="#">{translate('home')}</a>
                            <ul>
                                <li><Link to={`${process.env.PUBLIC_URL}/fashion`} >{translate('fashion')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/beauty`} >{translate('beauty')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/electronic`} >{translate('electronic')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/furniture`} >{translate('furniture')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/kids`} >{translate('kids')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pets`} >{translate('pets')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/vegetables`} >{translate('vegetables')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/watch`} >{translate('watch')}</Link></li>
                            </ul>
                        </li>
                        <li >
                            <a href="#">{translate('shop')}
                            </a>
                            <ul>
                                <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >{translate('category_left_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/right-sidebar/collection`} >{translate('category_right_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/no-sidebar/collection`} >{translate('category_no_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/metro/collection`} >{translate('category_metro')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/full-width/collection`} >{translate('category_full_width')}</Link></li>
                            </ul>
                        </li>
                        <li >
                            <a href="#">{translate('products')}
                            </a>
                            <ul>
                                <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/1`} >{translate('left_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/right-sidebar/product/1`} >{translate('right_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/no-sidebar/product/1`} >{translate('no_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/col-left/product/1`} >{translate('three_col_thumbnail_left')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/col-right/product/1`} >{translate('three_col_thumbnail_right')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/column/product/1`} >{translate('thumbnail_below')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/left-image/product/1`} >{translate('thumbnail_left')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/right-image/product/1`} >{translate('thumbnail_right')}</Link></li>
                            </ul>
                        </li>
                        <li className="mega" onMouseEnter={this.onMouseEnterHandler}>
                            <a href="#">{translate('features')}
                                <div className="lable-nav">{translate('new')}</div>
                            </a>
                            <ul className="mega-menu full-mega-menu">
                                <li>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title"><h5>{translate('theme_elements')}</h5></div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-title`} >{translate('element_title')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-banner`} >{translate('collection_banner')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-slider`} >{translate('home_slider')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-category`} >{translate('category')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-service`} >{translate('service')}</Link></li>
                                                            {/*<li><Link to={`${process.env.PUBLIC_URL}/features/element-ratio`} >{translate('image_size_ratio')}</Link></li>*/}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title"><h5>{translate('product_elements')}</h5></div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li className="up-text"><Link to={`${process.env.PUBLIC_URL}/features/element-product-box`} >{translate('product_box')}<span>10+</span></Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-product-slider`} >{translate('product_slider')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-product-no-slider`} >{translate('no_slider')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-product-multiple-slider`} >{translate('multi_slider')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/features/element-product-tab`} >{translate('tab')}</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title"><h5>{translate('email_template')}</h5></div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/email-template.html`} target="_blank">{translate('order_success')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/email-template-two.html`} target="_blank">{translate('order_success')}2</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/email-order-success.html`} target="_blank">{translate('email_template')}</Link></li>
                                                            <li><Link to={`${process.env.PUBLIC_URL}/email-order-success-two.html`} target="_blank">{translate('email_template')}2</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title"><h5>{translate('accessories')}</h5></div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><a href="#">{translate('fashion_jewellery')}</a></li>
                                                            <li><a href="#">{translate('caps_and_hats')}</a></li>
                                                            <li><a href="#">{translate('precious_jewellery')}</a></li>
                                                            <li><a href="#">{translate('necklaces')}</a></li>
                                                            <li><a href="#">{translate('earrings')}</a></li>
                                                            <li><a href="#">{translate('rings_wrist_wear')}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col mega-box">
                                                <div className="link-section">
                                                    <div className="menu-title"><h5>{translate('men_accessories')}</h5></div>
                                                    <div className="menu-content">
                                                        <ul>
                                                            <li><a href="#">{translate('ties')}</a></li>
                                                            <li><a href="#">{translate('cufflinks')}</a></li>
                                                            <li><a href="#">{translate('pockets_squares')}</a></li>
                                                            <li><a href="#">{translate('helmets')}</a></li>
                                                            <li><a href="#">{translate('scarves')}</a></li>
                                                            <li><a href="#">{translate('phone_cases')}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="row banner-padding">*/}
                                        {/*<div className="col-xl-6">*/}
                                            {/*<a href="#" className="mega-menu-banner"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/1.jpg`} className="img-fluid d-none d-xl-block " alt="" /></a>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-xl-6">*/}
                                            {/*<a href="#" className="mega-menu-banner"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`} className="img-fluid d-none d-xl-block" alt="" /></a>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </li>
                            </ul>
                        </li>
                        <li><a href="#">{translate('pages')}</a>
                            <ul>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/about-us`} >{translate('about_us')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/404`} >404</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/lookbook`} >{translate('lookbook')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/login`} >{translate('login')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/register`} >{translate('register')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/search`} >{translate('search')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/collection`} >{translate('collection')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/forget-password`} >{translate('forget_password')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/contact`} >{translate('contact')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/dashboard`} >{translate('dashboard')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/pages/faq`} >{translate('FAQ')}</Link></li>
                            </ul>
                        </li>
                        <li >
                            <a href="#">{translate('blog')}
                            </a>
                            <ul>
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/blog-page`} >{translate('blog_left_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/right-sidebar`} >{translate('blog_right_sidebar')}</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/blog/details`} >{translate('blog_detail')}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default withTranslate(NavBar);