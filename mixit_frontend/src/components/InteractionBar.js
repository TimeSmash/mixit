import React, {Component} from 'react'

// COMPONENTS //


// IMAGES //
import HeartButton from '../images/HeartButton.png'
import HeartButtonActive from '../images/HeartButtonActive.png'
import MadeButton from '../images/MadeButton.png'
import MadeButtonActive from '../images/MadeButtonActive.png'
import InterestedButton from '../images/InterestedButton.png'
import InterestedButtonActive from '../images/InterestedButtonActive.png'

import {BACKEND_URL} from '../constants.js'

import '../css/InteractionBar.css'
class InteractionBar extends Component {
    state = { favorited: false,
              made: false,
              interested:false,
              }

    toggleStatusOf = (quality) => {
        // SEND OVER HEADER OF AUTHORIZATION/TOKEN
        fetch(BACKEND_URL+`/${quality}_toggle/`+this.props.drink.id,{
            headers: {"Authorization": localStorage.getItem("token")}
        })
        .then(res => res.json())
        .then(json => {
            // console.log("toggleStatusOf fired",json)
            this.setState({[quality]: json[`${quality}`]})
        })
    }

    //toggleStatus Of needs to fetch and change quality, then setState to reflect that quality??

    
    showProperIconFor = (quality) => {
        switch (quality) {
            case "favorite":
                return this.state.favorited ? HeartButtonActive : HeartButton
            case "made":
                return this.state.made ? MadeButtonActive : MadeButton
            case "interested":
                return this.state.interested ? InterestedButtonActive : InterestedButton
            default:
                return null
        }
    }

    getUserStatsForDrink = () => {
        fetch(BACKEND_URL+'/get_user_drink', {
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization": localStorage.getItem("token"),
                "Drink-Id": this.props.drink.id
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.does_not_exist) {
                //do nothing, everything should remain false
                console.log("UserDrink for user" + localStorage.getItem("username") + "does not exist")
                if (this.state.favorited !== false || this.state.made !== false || this.state.interested !== false ){
                    this.setState({favorited: false, made: false, interested: false})
                }
            } else {
                console.log("UserDrink for user " + localStorage.getItem("username"),json)
                if (this.state.favorited !== json.favorited || this.state.made !== json.made || this.state.interested !== json.interested ){
                    this.setState({favorited: json.favorited, made: json.made, interested: json.interested})
                } else {
                    return null
                }
            }
        }
            )
    }
    
    componentDidMount(){
        this.getUserStatsForDrink()
    }

    render() {
        // console.log("InteractionBar props",this.props)
        this.getUserStatsForDrink()
        return (
            <div className="interactive-container">
                <img id="favorite"
                    className="interact-button" 
                    src={this.showProperIconFor("favorite")} 
                    onClick={()=>{this.toggleStatusOf("favorited")}}
                    alt ="Mark this drink as favorite" 
                ></img>
                <img id="made"
                    className="interact-button" 
                    src={this.showProperIconFor("made")}
                    onClick={()=>{this.toggleStatusOf("made")}}
                    alt ="Mark this drink as made" ></img> 
                <img id="interested"
                    className="interact-button" 
                    src={this.showProperIconFor("interested")}
                    onClick={()=>{this.toggleStatusOf("interested")}}
                    alt ="Mark this drink as interested" ></img> 
            </div>
        );
    }
}

export default InteractionBar;