import React, {Component} from 'react'
import {BACKEND_URL} from '../constants'
import DrinkCard from './DrinkCard' 

class Profile1 extends Component {
    state = { favoritedDrinks: [], madeDrinks:[], interestedDrinks:[], resolved:false }


    getDrinksThatUserMarkedAs = (quality) => {
            return this.state[`${quality}Drinks`] !== undefined ?this.state[`${quality}Drinks`].map(drinkObj => <DrinkCard
                drink={drinkObj}
                key={drinkObj.id}
        />) : null
    }

    componentDidMount(){
        fetch(BACKEND_URL+'/marked_drinks',{
            headers: {"Authorization": localStorage.getItem("token")}
        })
        .then(res => res.json())
        .then(json => {
            console.log("PROFILE",json)
            // {favorited_drinks: Array(7), made_drinks: Array(3), interested_drinks: Array(1)}
            return this.state.resolved === false ? this.setState({favoritedDrinks: json.favorited_drinks,
                madeDrinks: json.made_drinks,
                interestedDrinks: json.interested_drinks,
                resolved: true}) : null
        })
    }
    render() {

        console.log("prof state", this.state)
        console.log("fave state", this.state["favoritedDrinks"])

        return (
            <div>
                <div className="user-drink-container" style={{display:"inline",textAlign:"left",clear:"both"}}>
                <h1 style={{clear:"both"}}>Here is a list of the drinks you favorited:</h1>
                    {this.getDrinksThatUserMarkedAs("favorited")}
                </div>
                <div className="user-drink-container" style={{display:"inline",textAlign:"left",clear:"both"}}>
                <h1 style={{clear:"both"}}>Here is a list of the drinks you made:</h1>
                    {this.getDrinksThatUserMarkedAs("made")}
                </div>
                <div className="user-drink-container" style={{display:"inline",textAlign:"left",clear:"both"}}>
                <h1 style={{clear:"both"}}>Here is a list of the drinks you are interested in:</h1>
                    {this.getDrinksThatUserMarkedAs("interested")}
                </div>
            </div>
        );
    }
}

export default Profile1;