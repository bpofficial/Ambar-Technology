import React from "react";

export default () => {
    return (
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
    )
}