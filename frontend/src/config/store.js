import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import testReducer from '../redux/reducers/tests';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            test: testReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export default configureStore;
