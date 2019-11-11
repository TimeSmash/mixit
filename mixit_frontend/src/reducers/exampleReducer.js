function exampleReducer(example = "aqua", action) {
    switch(action.type) {
        case "RED":
            return "RED"
        case "BLUE":
            return "BLUE"
        case "GREEN":
            return "GREEN"
        default:
            return example
    }
}

export default exampleReducer