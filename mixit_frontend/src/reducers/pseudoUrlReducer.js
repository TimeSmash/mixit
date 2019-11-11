// A reducer made because for preloadedState and combineReducers, each key in preloadedState must be tied to reducer
function pseudoUrlReducer(state = "nothing", action) {
    switch(action.type) {
        case "nobody cares":
            return "Nobody cares"
        default:
            return state
    }
}

export default pseudoUrlReducer