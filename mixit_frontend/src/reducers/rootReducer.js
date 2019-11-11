import exampleReducer from './exampleReducer.js'
import drinkReducer from './drinkReducer'
import pseudoUrlReducer from './pseudoUrlReducer'
import showPropsReducer from './showPropsReducer'
import {combineReducers} from 'redux'
 
const rootReducer = combineReducers({
    example: exampleReducer, //set the state of color to be whatever reducer returns
    allDrinks: drinkReducer,
    BACKEND_URL: pseudoUrlReducer, // Only used to establish key for preloadedState
    showProps: showPropsReducer // Only used to establish key for preloadedState
});

export default rootReducer