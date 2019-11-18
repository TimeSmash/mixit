import {setDrinkIdRangesType} from "../actions/drink-actions"

//DrinksContainer needs to get drinks from backend if state.allDrinks === []
// to set new state of store, need to dispatch an action to reducer
// reducer should see type of action, if it is type obtainAll, should set state.allDrinks = fetched Drink.all
// 

// action is being sent to drink reducer in format of {type: TYPE, range: {lowestId: #, highestId: # }}

//in rootReducer, drinkIdRange: action.drinkToShow

function drinkReducer(state = {}, action) {
    // debugger
    switch(action.type) {
        case setDrinkIdRangesType:
            return action.idRange
        default:
            return state
    }
}

export default drinkReducer