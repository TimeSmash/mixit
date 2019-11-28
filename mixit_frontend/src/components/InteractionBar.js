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
        fetch(BACKEND_URL+`/${quality}_toggle`+this.props.drink.id)
        .then(res => res.json)
        .then(json => console.log(json))
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
            console.log(json)
            if (json.does_not_exist) {
                //do nothing, everything should remain false
                return null
            } else {
                // this.setState({favorited: json.favorited, made: json.made, interested: json.interested})

            }
        }
            )
    }
    
    componentDidMount(){
        this.getUserStatsForDrink()
    }

    render() {
        console.log("InteractionBar props",this.props)
        return (
            <div className="interactive-container">
                <img id="favorite"
                    className="interact-button" 
                    src={this.showProperIconFor("favorite")} 
                    onClick={()=>{this.toggleStatusOf("favorite")}}
                    alt ="Mark this drink as favorite" 
                ></img>
                <img id="made"
                    className="interact-button" 
                    src={this.showProperIconFor("made")}
                    onClick={()=>{this.setState({heartImg: "Heart2"})}}
                    alt ="Mark this drink as made" ></img> 
                <img id="interested"
                    className="interact-button" 
                    src={this.showProperIconFor("interested")}
                    onClick={()=>{this.setState({heartImg: HeartButtonActive})}}
                    alt ="Mark this drink as interested" ></img> 
            </div>
        );
    }
}

export default InteractionBar;