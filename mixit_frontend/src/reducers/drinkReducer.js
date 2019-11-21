import {showDrink} from "../actions/drink-actions"

//DrinksContainer needs to get drinks from backend if state.allDrinks === []
// to set new state of store, need to dispatch an action to reducer
// reducer should see type of action, if it is type obtainAll, should set state.allDrinks = fetched Drink.all
// 

// action is being sent to drink reducer in format of {type: TYPE, drinkToShow: {Drink obj}}

//in rootReducer, drinkToLoad: action.drinkToShow
 
function drinkReducer(state = {}, action) {
    // debugger
    switch(action.type) {
        case showDrink:
            return action.drinkToShow
        default:
            return state
    }
}

export default drinkReducer