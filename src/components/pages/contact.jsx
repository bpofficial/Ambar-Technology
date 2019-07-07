import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import { PAGE_CONSTANTS } from '../../constants/root';

class Contact extends Component {

    constructor (props) {
        super (props)
    }

    render() {


        return (
            <div>
                <Breadcrumb title={'Contact Us'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Enter Your name" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Last Name</label>
                                            <input type="text" className="form-control" id="last-name"
                                                   placeholder="Email" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Phone number</label>
                                            <input type="text" className="form-control" id="review"
                                                   placeholder="Enter your number" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                   required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message"
                                                      id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Send Your Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Contact