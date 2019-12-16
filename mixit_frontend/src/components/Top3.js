import React, {Component} from 'react'
import DrinkCard from './DrinkCard' 
import '../css/Top3.css'
class Top3 extends Component {
    // props is an array of objects [{drink=>count}]
// top_favorited: {
    // AlexanderObj: {drink: {<#>}, count: 2}
    // Aperol SpritzObj: {drink: {…}, count: 4}
    // Kir RoyaleObj: {drink: {…}, count: 3}
// }
    
    drinksWithCounts = Object.values(this.props.top3Drinks) //[{drink: <#>, count:#}, {}, {}]

    top3DrinkCards = () => {
        return this.drinksWithCounts.map(drinkCountObj => {
            return <div style={{float:"left"}}>
            <DrinkCard key={drinkCountObj.count} reduceSize={true} drink={drinkCountObj["drink"]}/>
            <div style={{marginRight:"1em"}}>
            <p style={{clear:"both", fontSize:"2.5em",fontWeight:"Bold"}}>{drinkCountObj.count}</p>
            <p style={{fontSize:"1.5em",marginTop:"-1em"}}>{this.props.type}</p>   
            </div>
            </div>
        })
    }

    // drinksWithCounts.forEach(d => console.log(d["drink"]))
    render(){
        console.log("HELLO fhrusfbifhj", this.props)
        console.log("drinksWithCounts", this.drinksWithCounts)
        // console.log("HYE", this.top3DrinkCards())
        // console.log("Drinks below")
    return (
        <div style={{margin:"auto"}}>
            <h4>Top 3 {this.props.type} Drinks</h4>
            <div style={{paddingLeft:"1.5em"}}>
                {this.top3DrinkCards()}
            </div>    
        </div>
    )}
}

export default Top3;