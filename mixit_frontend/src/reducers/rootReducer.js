import drinkReducer from './drinkReducer'
import drinkIdRangeReducer from './drinkIdRangeReducer'
import drinkSuggestionsReducer from './drinkSuggestionsReducer'
import {combineReducers} from 'redux'
 

// In store, these will be the keys.
// The keys' values are determined by what is returned from a reducer
// For example, when an action with type setDrink is dispatched to store, rootReducer makes drinkReducer handle it
// drinkReducer will return action.drinkToShow
// So, state.drinkToLoad= action.drinkToShow
// LOOKUP AS THOSE TERMS MIGHT NOT BE RIGHT IN ACTIONS 
 
const rootReducer = combineReducers({
    drinkToLoad: drinkReducer,
    drinkIdRange: drinkIdRangeReducer,
    drinkSuggestions: drinkSuggestionsReducer
});

export default rootReducer