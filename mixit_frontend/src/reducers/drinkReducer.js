import {obtainAll} from "../actions/drink-actions"

//DrinksContainer needs to get drinks from backend if state.allDrinks === []
// to set new state of store, need to dispatch an action to reducer
// reducer should see type of action, if it is type obtainAll, should set state.allDrinks = fetched Drink.all
// 

function drinkReducer(state = [], action) {
    // debugger
    switch(action.type) {
        case obtainAll:
            return action.allDrinks
        default:
            return state
    }
}

export default drinkReducer