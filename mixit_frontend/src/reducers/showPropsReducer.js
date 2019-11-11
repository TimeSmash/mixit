function pseudoShowPropsReducer(nothing = "nothing", action) {
    switch(action.type) {
        case "nobody cares":
            return "Nobody cares"
        default:
            return nothing
    }
}

export default pseudoShowPropsReducer