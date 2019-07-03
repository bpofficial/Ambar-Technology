import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import './index.scss';

// Import custom components
import store from './store';
import translations from './constants/translations'
import { getAllProducts } from './actions'
import Main from './components/layouts/main';


//Collection Pages
import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";

// Product Pages
import LeftSideBar from "./components/products/product";

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
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'} >
					<ScrollContext>
						<Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Main}/>
                            <Layout>

								{/*Routes For Features (Product Collection) */}
								<Route path={`${process.env.PUBLIC_URL}/collection`} component={CollectionLeftSidebar}/>

								{/*Routes For Single Product*/}
								<Route path={`${process.env.PUBLIC_URL}/product/:id`} component={LeftSideBar}/>
								

								{/*Routes For custom Features*/}
								<Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
								<Route path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut}/>
								<Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>

								{/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/about-us`} component={aboutUs}/>
                                <Route path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound}/>
                                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
                                <Route path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                                <Route path={`${process.env.PUBLIC_URL}/search`} component={Search}/>
                                <Route path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/contact`} component={Contact}/>
                                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard}/>
                                <Route path={`${process.env.PUBLIC_URL}/faq`} component={Faq}/>

								{/*Blog Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details}/>
                                <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/>

                            </Layout>
                            <Route exact component={PageNotFound} />
                         </Switch>
					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


