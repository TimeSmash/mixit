import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';


//PERSISITING REDUX
import rootReducer from './reducers/rootReducer'  // Conglomerate reducer to define how actions dealt with 
import { Provider } from 'react-redux'; //Needed to give App store in the first place (even with non-persisting Redux)
import {createStore} from 'redux'; //Needed to create the store for Redux (even with non-persisting Redux)
import { persistStore, persistReducer } from 'redux-persist'; //Used to create persisting store along with persisiting Reducer
import storage from 'redux-persist/lib/storage'; //The kind of storage used in persisiting Redux
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; //App-specific Merge processor needed for Redux-persist
import { PersistGate } from 'redux-persist/integration/react'; //Needed for Redux-Persist and React Usage to rehydrate store properly

// ????????????


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// PersistGate delays the rendering of your app’s UI until your persisted state has been retrieved and saved to redux


// persistConfig is used to define the 
// key: this value will define what will be the key that we will use as identifier to save the persisted information
// storage: The engine we will use for persistence.
// It can also be used to define the blacklist or whitelist, which are lists of reducers to omit/include for persistence
//Other things it can define include stateReconciler, which tells Redux the way state should be merged upon rehydration


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
   };


   //Merge Process
//   autoMergeLevel2: Auto merge means if the some piece of substate was modified by your reducer
//   during the REHYDRATE action, it will skip this piece of state.

   //This reducer wraps around rootReducer, using persistConfig to establish persisting qualities to it
   const persistingReducer = persistReducer(persistConfig, rootReducer);


// let initialStore = {
//     drinkToLoad: {}
// };

// create the store using persistingReducer as the main reducer
//remember that persisting Reducer is wrapping rootReducer
export const store = createStore(persistingReducer);

//Use persistStore to actually persist the store created with the persistReducer?
export const persistor = persistStore(store);

//OLD: create the store using rootReducer(has many reducers in it) and initialize with initialStore (preloadedState)
// const store = createStore(rootReducer, initialStore);

store.subscribe( () => { console.log("Subscribe: current store/state", store.getState()) } )

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// HOW PERSISTING STORE ACTUALLY WORKS

// When your app launches, redux sets an initial state. 
// Shortly after this, Redux Persist retrieves your persisted state from storage. 
// Your persisted state then overrides any initial state.