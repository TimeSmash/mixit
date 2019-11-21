import {setDrinkSuggestionsType} from "../actions/drink-actions"

//DrinksContainer needs to get drinks from backend if state.allDrinks === []
// to set new state of store, need to dispatch an action to reducer
// reducer should see type of action, if it is type obtainAll, should set state.allDrinks = fetched Drink.all
// 

// action is being sent to drink reducer in format of {type: TYPE, drinkSuggestions: {drinks_with_same_flav: [] B: [] C:[] D:[]}

//in rootReducer, drinkSuggestions: action.drinkSuggestions

function drinkSuggestionsReducer(state = {
    drinks_with_same_flav: [],
    drinks_with_same_alc: [],
    drinks_with_same_type: [],
    similar_drinks: [],
}, action) {
    // debugger
    switch(action.type) {
        case setDrinkSuggestionsType:
            return action.drinkSuggestions
        default:
            return state
    }
}

export default drinkSuggestionsReducer