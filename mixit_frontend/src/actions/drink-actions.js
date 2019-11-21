

export const showDrink = "show specified drink"

export function setDrinkToShow(drink)  {return {type: showDrink, drinkToShow: drink}} 



export const setDrinkIdRangesType = "get drink id ranges"

export function setDrinkIdRanges(range) {return {type: setDrinkIdRangesType, idRange: range} }

export const setDrinkSuggestionsType = "set drink suggestions"

export function setDrinkSuggestions(suggestionObject) {return {type: setDrinkSuggestionsType, drinkSuggestions: suggestionObject} }