import exampleReducer from './exampleReducer.js'
import drinkReducer from './drinkReducer'
import {combineReducers} from 'redux'
 

// In store, these will be the keys.
// The keys' values are determined by what is returned from a reducer
// For example, when an action with type obtainAll is dispatched to store, rootReducer makes drinkReducer handle it
// drinkReducer will return action.allDrinks 
// So, state.allDrinks = action.allDrinks 

const rootReducer = combineReducers({
    // example: exampleReducer, //set the state of color to be whatever reducer returns, THIS DOES NOT MATTER AT ALL
    drinkToLoad: drinkReducer
});

export default rootReducer