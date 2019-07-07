import React, { Component } from 'react';
import Pace from 'react-pace-progress'

// Import custom components
import NavBar from "./common/navbar";
import CartContainer from "../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";

export default class Header extends Component {

    constructor(props) {
        super(props);

		this.state = {
			isLoading: false
		}
    }

    componentDidMount() {
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);
    }

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if( openmyslide ){
            openmyslide.classList.add('open-side')
		}
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

	load = ()=>{
		this.setState({ isLoading: true });
		fetch().then(()=>{
			// deal with data fetched
			this.setState({ isLoading: false })
		})
	};
	
	render() {

		return (
			<div>
				<header >
					{this.state.isLoading ? <Pace color="#27ae60"/> : null}
					<div className="mobile-fix-option"></div>
					{/*Top Header Component <TopBar shade="light"/> */}
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-12">
								<div className="main-menu">
									<div className="menu-left">
										<div className="brand-logo">
                                            <LogoImage logo={this.props.logoName} />
										</div>
									</div>
									<div className="menu-right pull-right">
										{/*Top Navigation Bar Component*/}
										<NavBar/>
										<div>
											<div className="icon-nav">
												<ul>
													<li className="onhover-div mobile-search">
														<div>
															<img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`} onClick={this.openSearch} className="img-fluid" alt="" />
															<i className="fa fa-search" onClick={this.openSearch} />
														</div>
													</li>
													{/*Header Cart Component */}
													<CartContainer/>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <form>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search a Product" />
                                            </div>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			)
	}
}