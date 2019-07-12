import React from "react";
import Mailchimp from "./mailchimp";

export default (props) => {
    switch(props) {
        case props.mailchimp: 
            return <Mailchimp />
        default:
            return <Mailchimp />
    }
}