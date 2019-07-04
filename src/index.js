import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import './index.scss';

// Import custom components
import store from './store';
import { getAllProducts } from './actions'
import Main from './components/layouts/main';


//Collection Pages
import Store from "./components/collection/store";

// Product Pages
import ProductPage from "./components/products/product";

// Features
import Layout from './components/app'
import Cart from './components/cart'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'

// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Search from './components/pages/search'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard'
import Faq from './components/pages/faq'

// Blog Pages
import RightSide from './components/blogs/right-sidebar'
import Details from './components/blogs/details'
import BlogPage from './components/blogs/blog-page'

class Root extends React.Component {

    render() {
        store.dispatch(getAllProducts());

        return(
        	<Provider store={store}>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
						<Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Main}/>
                            <Layout>

								<Route path={`${process.env.PUBLIC_URL}/store/:category/:id`} component={ProductPage}/>
                                <Route path={`${process.env.PUBLIC_URL}/store/:category`} component={Store} />
                                <Route exact path={`${process.env.PUBLIC_URL}/store`} component={Store}/>

								{/*Routes For custom Features*/}
								<Route exact path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
								<Route exact path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut}/>
								<Route exact path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>

								{/*Routes For Extra Pages*/}
                                <Route exact path={`${process.env.PUBLIC_URL}/about-us`} component={aboutUs}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/search`} component={Search}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgetPassword}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/faq`} component={Faq}/>

								{/*Blog Pages*/}
                                <Route exact path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/>

                            </Layout>
                            <Route exact component={PageNotFound} />
                            <Redirect from='*' to='/404' />
                         </Switch>
					  </ScrollContext>
				</BrowserRouter>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


