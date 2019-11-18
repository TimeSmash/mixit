

export const showDrink = "show specified drink"

export function setDrinkToShow(drink)  {return {type: showDrink, drinkToShow: drink}} 


//DINW 
export const setDrinkIdRangesType = "get drink id ranges"

export function setDrinkIdRanges(range) {return {type: setDrinkIdRangesType, idRange: range} }