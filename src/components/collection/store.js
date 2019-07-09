import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import Breadcrumb from "../common/breadcrumb";
import FeaturedProducts from "../common/featured";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import { PAGE_CONSTANTS } from '../../constants/root';

export default ({ match }) => { 
    console.log(match)
    const [layoutColumns, setLayoutColumns] = useState(3);
    const openFilter = () => { 
        document.querySelector(".collection-filter").style = "left: -15px";
    }

    const getBreadCrumb = () => {
        let title;
        if ('category' in match.params) {
            title = ['Store', match.params.category]
        } else {
            title = 'Store';
        }
        return title;
    }

    return (
        <div>
            { /*SEO Support*/}
            <Helmet>
                <title>Store | { PAGE_CONSTANTS.title}</title>
                <meta name="description" content={PAGE_CONSTANTS.meta.description} />
            </Helmet>
            { /*SEO Support End */}

            <Breadcrumb title={getBreadCrumb()}/>

            <section className="section-b-space">
                <div className="collection-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 collection-filter">

                                <StickyBox offsetTop={20} offsetBottom={20}>
                                    <div>
                                        <Filter />
                                        <FeaturedProducts />
                                    </div>
                                </StickyBox>
                                { /*side-bar banner end here*/}
                            </div>
                            <div className="collection-content col">
                                <div className="page-main-content ">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="top-banner-wrapper">
                                                    <a href="/"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`} className="img-fluid" alt=""/></a>
                                                </div>
                                                <div className="collection-product-wrapper">
                                                    <div className="product-top-filter">
                                                        <div className="container-fluid p-0">
                                                            <div className="row">
                                                                <div className="col-xl-12">
                                                                    <div className="filter-main-btn">
                                                                        <span onClick={openFilter}
                                                                            className="filter-btn btn btn-theme"><i
                                                                            className="fa fa-filter"
                                                                            aria-hidden="true"></i> Filter</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <FilterBar onLayoutViewClicked={(colmuns) => setLayoutColumns(colmuns)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    { /*Products Listing Component*/}
                                                    <ProductListing colSize={layoutColumns}/>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}