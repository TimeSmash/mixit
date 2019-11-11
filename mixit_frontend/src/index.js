import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './reducers/rootReducer'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';




let initialStore = {
    allDrinks: []
};

// const rootReducer = () => {return "HEY"}

//create the store using rootReducer(has many reducers in it) and initialize with initialStore (preloadedState)
const store = createStore(rootReducer, initialStore);

store.subscribe( () => { console.log("current state", store.getState()) } )

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
