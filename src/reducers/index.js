import { combineReducers } from 'redux';

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';

const rootReducer = combineReducers({
    data: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
});

export default rootReducer;