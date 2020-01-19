import React, {Component} from 'react'
import {BACKEND_URL} from '../constants'
import DrinkCard from './DrinkCard' 

class Profile1 extends Component {
    //since not giving profile editing options, consider renaming this Your Drinks or something similar
    state = { favoritedDrinks: [], madeDrinks:[], interestedDrinks:[], resolved:false }

    
    removeDrinkFromArray = (quality,id) => {
        console.log("QUAL",quality)
        switch (quality){
            case "favorited":
                return this.setState({favoritedDrinks: this.state.favoritedDrinks.filter(drink => drink.id !== id)})
            case "made":
                return this.setState({madeDrinks: this.state.madeDrinks.filter(drink => drink.id !== id)})
            case "interested":
                return this.setState({interestedDrinks: this.state.interestedDrinks.filter(drink => drink.id !== id)})
            default:
                return null
        }
    }

    getDrinksThatUserMarkedAs = (quality) => {
            return this.state[`${quality}Drinks`] !== undefined ?this.state[`${quality}Drinks`].map(drinkObj => <DrinkCard
                drink={drinkObj}
                key={drinkObj.id}
                qual={quality}
                showButton={true}
                removeDrinkFromArray={this.removeDrinkFromArray}
        />) : null
    }

    showDrinkArray = (quality) => {
        if (this.state[`${quality}Drinks`].length === 0){
            return <p style={{clear:"both",textAlign:"center"}}>You haven't marked any drinks as {quality} yet. Go find some!</p>
        } else{
            return this.getDrinksThatUserMarkedAs(quality)
        }
    }

    componentDidMount(){
        fetch(BACKEND_URL+'/marked_drinks',{
            headers: {"Authorization": localStorage.getItem("token")}
        })
        .then(res => res.json())
        .then(json => {
            console.log("PROFILE",json)
            // {favorited_drinks: [{}{}{}], made_drinks: Array(3), interested_drinks: Array(1)}
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
            <div style={{paddingLeft: "4em", paddingRight: "4em",}}>
                <h1>Profile</h1>

                <div className="user-drink-container" style={{margin: "auto",display:"inline",textAlign:"left",clear:"both"}}>
                    <h3 style={{clear:"both",textAlign:"center"}}>Here is a list of the drinks you favorited:</h3>
                    {this.showDrinkArray("favorited")}
                </div>

                <div className="user-drink-container" style={{display:"inline",textAlign:"left",clear:"both"}}>
                <h3 style={{clear:"both",textAlign:"center"}}>Here is a list of the drinks you made:</h3>
                    {this.showDrinkArray("made")}
                    
                </div>

                <div className="user-drink-container" style={{display:"inline",textAlign:"left",clear:"both"}}>
                <h3 style={{clear:"both",textAlign:"center"}}>Here is a list of the drinks you are interested in:</h3>
                    {this.showDrinkArray("interested")}
                </div>
            </div>
        );
    }
}

export default Profile1;