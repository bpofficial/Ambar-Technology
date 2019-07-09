import React, {Component } from 'react';
import Breadcrumb from "../common/breadcrumb";

class Collection extends Component {

    constructor (props) {
        super (props)
    }

    render() {


        return (
            <div>
                <Breadcrumb title={'Collection'}/>
                
                
                {/*Collection section*/}
                <section className="collection section-b-space">
                    <div className="container">
                        <div className="row partition-collection">
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/1.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/3.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/5.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/6.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="row partition-collection section-t-space">
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/7.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/8.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/9.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="collection-block">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/store/11.jpg`} className="img-fluid" alt="" />
                                        <div className="collection-content">
                                            <h4>(20 products)</h4>
                                            <h3>fashion</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry....</p>
                                            <a href="category-page.html" className="btn btn-outline">shop now !</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Collection